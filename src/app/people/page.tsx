'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import PersonCard from '@/components/people/PersonCard';
import PersonDetailModal from '@/components/people/PersonDetailModal';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { PageHeader } from '@/components/ui/page-header';
import { Pagination } from '@/components/ui/pagination';
import { ErrorState } from '@/components/ui/error-state';
import { Users } from 'lucide-react';
import { peopleApi, ApiError } from '@/lib/api-client';
import { NormalizedPerson, PersonDetailModalProps } from '@/lib/types';

export default function PeoplePage() {
    const [people, setPeople] = useState<NormalizedPerson[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<NormalizedPerson | null>(null);

    const loadPeople = async (page: number, searchQuery: string = '') => {
        setLoading(true);
        setError(null);

        try {
            const response = await peopleApi.getAll({
                page: page.toString(),
                search: searchQuery.trim() || undefined,
            });

            setPeople(response.results);
            setTotalCount(response.count);
            setHasNext(!!response.next);
            setHasPrevious(!!response.previous);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Failed to load people');
            }
            console.error('Error loading people:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPeople(currentPage, search);
    }, [currentPage, search]);

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePersonClick = (person: NormalizedPerson) => {
        setSelectedPerson(person);
    };

    if (error) {
        return (
            <AppShell title="People">
                <ErrorState
                    icon={<Users className="w-16 h-16 mx-auto mb-4 opacity-50" />}
                    title="Error Loading People"
                    message={error}
                    onRetry={() => loadPeople(currentPage, search)}
                />
            </AppShell>
        );
    }

    return (
        <AppShell title="People">
            <div className="space-y-4 pb-12">
                <PageHeader
                    title="Star Wars Characters"
                    loading={loading}
                    totalCount={totalCount}
                    countLabel="characters available"
                    search={search}
                    searchPlaceholder="Search characters..."
                    onSearchChange={handleSearch}
                />

                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {people.map((person) => (
                                <PersonCard
                                    key={person.id}
                                    person={person}
                                    onClick={handlePersonClick}
                                />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            pageLabel="of Star Wars characters"
                            hasNext={hasNext}
                            hasPrevious={hasPrevious}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            <PersonDetailModal
                person={selectedPerson}
                onClose={() => setSelectedPerson(null)}
            />
        </AppShell>
    );
}
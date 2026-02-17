'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PersonCard from '@/components/people/PersonCard';
import PersonDetailModal from '@/components/people/PersonDetailModal';
import { ChevronLeft, ChevronRight, Search, Users } from 'lucide-react';
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
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Card className="card-galactic p-8 text-center">
                        <div className="text-red-400 mb-4">
                            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        </div>
                        <h2 className="text-xl font-semibold text-[#E5E7EB] mb-2">Error Loading People</h2>
                        <p className="text-[#94A3B8] mb-4">{error}</p>
                        <Button
                            onClick={() => loadPeople(currentPage, search)}
                            className="bg-[#60A5FA] hover:bg-[#3B82F6] text-[#0B1020]"
                        >
                            Try Again
                        </Button>
                    </Card>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell title="People">
            <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E5E7EB] mb-2">Star Wars Characters</h2>
                        <p className="text-[#94A3B8]">
                            {loading ? 'Loading...' : `${totalCount} characters available`}
                        </p>
                    </div>

                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <Input
                            placeholder="Search characters..."
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <Card className="card-galactic p-4 h-64">
                                    <div className="flex items-start space-x-4 mb-4">
                                        <div className="w-16 h-16 rounded-full bg-[#374151]" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-[#374151] rounded w-3/4" />
                                            <div className="h-3 bg-[#374151] rounded w-1/2" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-3 bg-[#374151] rounded" />
                                        <div className="h-3 bg-[#374151] rounded" />
                                        <div className="h-3 bg-[#374151] rounded" />
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {people.map((person) => (
                                <PersonCard
                                    key={person.id}
                                    person={person}
                                    onClick={handlePersonClick}
                                />
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-[#94A3B8]">
                                Showing page {currentPage} of Star Wars characters
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={!hasPrevious}
                                    className="flex items-center space-x-1"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    <span>Previous</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={!hasNext}
                                    className="flex items-center space-x-1"
                                >
                                    <span>Next</span>
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
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
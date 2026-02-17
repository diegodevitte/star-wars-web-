'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import StarshipCard from '@/components/starship/StarshipCard';
import StarshipDetailModal from '@/components/starship/StarshipDetailModal';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { PageHeader } from '@/components/ui/page-header';
import { Pagination } from '@/components/ui/pagination';
import { ErrorState } from '@/components/ui/error-state';
import { Rocket } from 'lucide-react';
import { starshipsApi, ApiError } from '@/lib/api-client';
import { NormalizedStarship } from '@/lib/types';

export default function StarshipsPage() {
    const [starships, setStarships] = useState<NormalizedStarship[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [selectedStarship, setSelectedStarship] = useState<NormalizedStarship | null>(null);

    const loadStarships = async (page: number, searchQuery: string = '') => {
        setLoading(true);
        setError(null);

        try {
            const response = await starshipsApi.getAll({
                page: page.toString(),
                search: searchQuery.trim() || undefined,
            });

            setStarships(response.results);
            setTotalCount(response.count);
            setHasNext(!!response.next);
            setHasPrevious(!!response.previous);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Failed to load starships');
            }
            console.error('Error loading starships:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStarships(currentPage, search);
    }, [currentPage, search]);

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleStarshipClick = (starship: NormalizedStarship) => {
        setSelectedStarship(starship);
    };

    if (error) {
        return (
            <AppShell title="Starships">
                <ErrorState
                    icon={<Rocket className="w-16 h-16 mx-auto mb-4 opacity-50" />}
                    title="Error Loading Starships"
                    message={error}
                    onRetry={() => loadStarships(currentPage, search)}
                />
            </AppShell>
        );
    }

    return (
        <AppShell title="Starships">
            <div className="space-y-6">
                <PageHeader
                    title="Star Wars Starships"
                    loading={loading}
                    totalCount={totalCount}
                    countLabel="starships in the fleet"
                    search={search}
                    searchPlaceholder="Search starships..."
                    onSearchChange={handleSearch}
                />

                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {starships.map((starship) => (
                                <StarshipCard
                                    key={starship.id}
                                    starship={starship}
                                    onClick={handleStarshipClick}
                                />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            pageLabel="of the galactic fleet"
                            hasNext={hasNext}
                            hasPrevious={hasPrevious}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            <StarshipDetailModal
                starship={selectedStarship}
                onClose={() => setSelectedStarship(null)}
            />
        </AppShell>
    );
}
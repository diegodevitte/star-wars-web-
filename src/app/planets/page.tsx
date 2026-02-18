'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import PlanetCard from '@/components/planet/PlanetCard';
import PlanetDetailModal from '@/components/planet/PlanetDetailModal';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { PageHeader } from '@/components/ui/page-header';
import { Pagination } from '@/components/ui/pagination';
import { ErrorState } from '@/components/ui/error-state';
import { Globe } from 'lucide-react';
import { planetsApi, ApiError } from '@/lib/api-client';
import { NormalizedPlanet } from '@/lib/types';

export default function PlanetsPage() {
    const [planets, setPlanets] = useState<NormalizedPlanet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState<NormalizedPlanet | null>(null);

    const loadPlanets = async (page: number, searchQuery: string = '') => {
        setLoading(true);
        setError(null);

        try {
            const response = await planetsApi.getAll({
                page: page.toString(),
                search: searchQuery.trim() || undefined,
            });

            setPlanets(response.results);
            setTotalCount(response.count);
            setHasNext(!!response.next);
            setHasPrevious(!!response.previous);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Failed to load planets');
            }
            console.error('Error loading planets:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPlanets(currentPage, search);
    }, [currentPage, search]);

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePlanetClick = (planet: NormalizedPlanet) => {
        setSelectedPlanet(planet);
    };

    if (error) {
        return (
            <AppShell title="Planets">
                <ErrorState
                    icon={<Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />}
                    title="Error Loading Planets"
                    message={error}
                    onRetry={() => loadPlanets(currentPage, search)}
                />
            </AppShell>
        );
    }

    return (
        <AppShell title="Planets">
            <div className="space-y-4 pb-12">
                <PageHeader
                    title="Star Wars Planets"
                    loading={loading}
                    totalCount={totalCount}
                    countLabel="planets in the galaxy"
                    search={search}
                    searchPlaceholder="Search planets..."
                    onSearchChange={handleSearch}
                />

                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {planets.map((planet) => (
                                <PlanetCard
                                    key={planet.id}
                                    planet={planet}
                                    onClick={handlePlanetClick}
                                />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            pageLabel="of planetary systems"
                            hasNext={hasNext}
                            hasPrevious={hasPrevious}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            <PlanetDetailModal
                planet={selectedPlanet}
                onClose={() => setSelectedPlanet(null)}
            />
        </AppShell>
    );
}
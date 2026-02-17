'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Search, Globe } from 'lucide-react';
import { planetsApi, ApiError } from '@/lib/api-client';
import { NormalizedPlanet, PlanetCardProps, PlanetDetailModalProps } from '@/lib/types';

const PlanetCard = ({ planet, onClick }: PlanetCardProps) => {
    const getClimateColor = (climate: string) => {
        if (climate.includes('arid') || climate.includes('desert')) return 'from-[#F87171] to-[#EF4444]';
        if (climate.includes('tropical') || climate.includes('temperate')) return 'from-[#10B981] to-[#059669]';
        if (climate.includes('frozen') || climate.includes('frigid')) return 'from-[#60A5FA] to-[#3B82F6]';
        return 'from-[#8B5CF6] to-[#7C3AED]';
    };

    return (
        <Card
            className="card-galactic p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] relative group"
            onClick={() => onClick(planet)}
        >
            <div className="flex items-start space-x-4 mb-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getClimateColor(planet.climate)} flex items-center justify-center shadow-[0_0_20px_rgba(96,165,250,0.3)]`}>
                    <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#E5E7EB] group-hover:text-[#60A5FA] transition-colors">
                        {planet.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                            {planet.climate}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            {planet.terrain}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Diameter:</span>
                    <span className="text-sm text-[#E5E7EB]">{planet.diameter} km</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Population:</span>
                    <span className="text-sm text-[#E5E7EB]">{planet.population}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Gravity:</span>
                    <span className="text-sm text-[#E5E7EB]">{planet.gravity}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Rotation:</span>
                    <span className="text-sm text-[#E5E7EB]">{planet.rotation_period}h</span>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/5 to-[#2DD4BF]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Card>
    );
}

const PlanetDetailModal = ({ planet, onClose }: PlanetDetailModalProps) => {
    if (!planet) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <Card className="card-galactic p-6 max-w-3xl w-full mx-4 relative z-10 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#E5E7EB]">{planet.name}</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-[#94A3B8] hover:text-[#E5E7EB]"
                    >
                        ✕
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#60A5FA] mb-3 flex items-center">
                                <Globe className="w-5 h-5 mr-2" />
                                Physical
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Diameter</span>
                                    <span className="text-[#E5E7EB] font-medium">{planet.diameter} km</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Gravity</span>
                                    <span className="text-[#E5E7EB] font-medium">{planet.gravity}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Surface Water</span>
                                    <span className="text-[#E5E7EB] font-medium">{planet.surface_water}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#10B981] mb-3">Environmental</h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Climate</span>
                                    <span className="text-[#E5E7EB] font-medium">{planet.climate}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Terrain</span>
                                    <span className="text-[#E5E7EB] font-medium">{planet.terrain}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#F87171] mb-3">Orbital & Social</h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Rotation Period</span>
                                    <span className="text-[#E5E7EB] font-medium">{planet.rotation_period} hours</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Orbital Period</span>
                                    <span className="text-[#E5E7EB] font-medium">{planet.orbital_period} days</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Population</span>
                                    <span className="text-[#E5E7EB] font-medium">{planet.population}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Residents</span>
                                    <span className="text-[#E5E7EB] font-medium">{planet.residents.length} known</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Featured in Films</span>
                                    <span className="text-[#E5E7EB] font-medium">{planet.films.length} movies</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

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
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Card className="card-galactic p-8 text-center">
                        <div className="text-red-400 mb-4">
                            <Globe className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        </div>
                        <h2 className="text-xl font-semibold text-[#E5E7EB] mb-2">Error Loading Planets</h2>
                        <p className="text-[#94A3B8] mb-4">{error}</p>
                        <Button
                            onClick={() => loadPlanets(currentPage, search)}
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
        <AppShell title="Planets">
            <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E5E7EB] mb-2">Star Wars Planets</h2>
                        <p className="text-[#94A3B8]">
                            {loading ? 'Loading...' : `${totalCount} planets in the galaxy`}
                        </p>
                    </div>

                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <Input
                            placeholder="Search planets..."
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
                            {planets.map((planet) => (
                                <PlanetCard
                                    key={planet.id}
                                    planet={planet}
                                    onClick={handlePlanetClick}
                                />
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-[#94A3B8]">
                                Showing page {currentPage} of planetary systems
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

            <PlanetDetailModal
                planet={selectedPlanet}
                onClose={() => setSelectedPlanet(null)}
            />
        </AppShell>
    );
}
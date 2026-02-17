'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Search, User, Users } from 'lucide-react';
import { peopleApi, ApiError } from '@/lib/api-client';
import { NormalizedPerson, PersonCardProps, PersonDetailModalProps } from '@/lib/types';

const PersonCard = ({ person, onClick }: PersonCardProps) => {
    return (
        <Card
            className="card-galactic p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] relative group"
            onClick={() => onClick(person)}
        >
            <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#60A5FA] to-[#2DD4BF] flex items-center justify-center shadow-[0_0_20px_rgba(96,165,250,0.3)]">
                    <User className="w-8 h-8 text-[#0B1020]" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#E5E7EB] group-hover:text-[#60A5FA] transition-colors">
                        {person.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                            {person.gender}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            {person.birth_year}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Height:</span>
                    <span className="text-sm text-[#E5E7EB]">{person.height} cm</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Mass:</span>
                    <span className="text-sm text-[#E5E7EB]">{person.mass} kg</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Hair:</span>
                    <span className="text-sm text-[#E5E7EB]">{person.hair_color}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Eyes:</span>
                    <span className="text-sm text-[#E5E7EB]">{person.eye_color}</span>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/5 to-[#2DD4BF]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Card>
    );
}

const PersonDetailModal = ({ person, onClose }: PersonDetailModalProps) => {
    if (!person) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <Card className="card-galactic p-6 max-w-2xl w-full mx-4 relative z-10 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#E5E7EB]">{person.name}</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-[#94A3B8] hover:text-[#E5E7EB]"
                    >
                        ✕
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#60A5FA] mb-2">Physical</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-[#94A3B8]">Height:</span>
                                    <span className="text-[#E5E7EB]">{person.height} cm</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#94A3B8]">Mass:</span>
                                    <span className="text-[#E5E7EB]">{person.mass} kg</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#94A3B8]">Hair Color:</span>
                                    <span className="text-[#E5E7EB]">{person.hair_color}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#94A3B8]">Skin Color:</span>
                                    <span className="text-[#E5E7EB]">{person.skin_color}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#94A3B8]">Eye Color:</span>
                                    <span className="text-[#E5E7EB]">{person.eye_color}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#2DD4BF] mb-2">Personal</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-[#94A3B8]">Birth Year:</span>
                                    <span className="text-[#E5E7EB]">{person.birth_year}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#94A3B8]">Gender:</span>
                                    <span className="text-[#E5E7EB]">{person.gender}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#94A3B8]">Homeworld:</span>
                                    <span className="text-[#E5E7EB]">{person.homeworld}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-[#F87171] mb-2">Statistics</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-[#94A3B8]">Films:</span>
                                    <span className="text-[#E5E7EB]">{person.films.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#94A3B8]">Starships:</span>
                                    <span className="text-[#E5E7EB]">{person.starships.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#94A3B8]">Vehicles:</span>
                                    <span className="text-[#E5E7EB]">{person.vehicles.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

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
'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import VehicleCard from '@/components/vehicle/VehicleCard';
import VehicleDetailModal from '@/components/vehicle/VehicleDetailModal';
import { LoadingSkeleton } from '@/components/ui/loading-skeleton';
import { PageHeader } from '@/components/ui/page-header';
import { Pagination } from '@/components/ui/pagination';
import { ErrorState } from '@/components/ui/error-state';
import { Car } from 'lucide-react';
import { vehiclesApi, ApiError } from '@/lib/api-client';
import { NormalizedVehicle } from '@/lib/types';

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<NormalizedVehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<NormalizedVehicle | null>(null);

    const loadVehicles = async (page: number, searchQuery: string = '') => {
        setLoading(true);
        setError(null);

        try {
            const response = await vehiclesApi.getAll({
                page: page.toString(),
                search: searchQuery.trim() || undefined,
            });

            setVehicles(response.results);
            setTotalCount(response.count);
            setHasNext(!!response.next);
            setHasPrevious(!!response.previous);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError('Failed to load vehicles');
            }
            console.error('Error loading vehicles:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadVehicles(currentPage, search);
    }, [currentPage, search]);

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleVehicleClick = (vehicle: NormalizedVehicle) => {
        setSelectedVehicle(vehicle);
    };

    if (error) {
        return (
            <AppShell title="Vehicles">
                <ErrorState
                    icon={<Car className="w-16 h-16 mx-auto mb-4 opacity-50" />}
                    title="Error Loading Vehicles"
                    message={error}
                    onRetry={() => loadVehicles(currentPage, search)}
                />
            </AppShell>
        );
    }

    return (
        <AppShell title="Vehicles">
            <div className="space-y-4 pb-12">
                <PageHeader
                    title="Star Wars Vehicles"
                    loading={loading}
                    totalCount={totalCount}
                    countLabel="vehicles in the garage"
                    search={search}
                    searchPlaceholder="Search vehicles..."
                    onSearchChange={handleSearch}
                />

                {loading ? (
                    <LoadingSkeleton />
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {vehicles.map((vehicle) => (
                                <VehicleCard
                                    key={vehicle.id}
                                    vehicle={vehicle}
                                    onClick={handleVehicleClick}
                                />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            pageLabel="of the vehicle fleet"
                            hasNext={hasNext}
                            hasPrevious={hasPrevious}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>

            <VehicleDetailModal
                vehicle={selectedVehicle}
                onClose={() => setSelectedVehicle(null)}
            />
        </AppShell>
    );
}
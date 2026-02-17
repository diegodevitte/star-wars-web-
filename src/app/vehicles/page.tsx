'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/shell/app-shell';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Search, Car, Truck } from 'lucide-react';
import { vehiclesApi, ApiError } from '@/lib/api-client';
import { NormalizedVehicle, VehicleCardProps, VehicleDetailModalProps } from '@/lib/types';

const VehicleCard = ({ vehicle, onClick }: VehicleCardProps) => {
    const getVehicleClassColor = (vehicleClass: string) => {
        if (vehicleClass.includes('speeder') || vehicleClass.includes('bike')) return 'from-[#10B981] to-[#059669]';
        if (vehicleClass.includes('walker') || vehicleClass.includes('AT')) return 'from-[#F87171] to-[#EF4444]';
        if (vehicleClass.includes('transport') || vehicleClass.includes('barge')) return 'from-[#F59E0B] to-[#D97706]';
        if (vehicleClass.includes('tank') || vehicleClass.includes('artillery')) return 'from-[#8B5CF6] to-[#7C3AED]';
        return 'from-[#60A5FA] to-[#3B82F6]';
    };

    const getVehicleIcon = (vehicleClass: string) => {
        if (vehicleClass.includes('walker')) return Car;
        if (vehicleClass.includes('speeder')) return Car;
        if (vehicleClass.includes('transport')) return Truck;
        return Car;
    };

    const Icon = getVehicleIcon(vehicle.vehicle_class);

    return (
        <Card
            className="card-galactic p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] relative group"
            onClick={() => onClick(vehicle)}
        >
            <div className="flex items-start space-x-4 mb-4">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${getVehicleClassColor(vehicle.vehicle_class)} flex items-center justify-center shadow-[0_0_20px_rgba(96,165,250,0.3)]`}>
                    <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#E5E7EB] group-hover:text-[#60A5FA] transition-colors">
                        {vehicle.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                            {vehicle.vehicle_class}
                        </Badge>
                        {vehicle.max_atmosphering_speed && vehicle.max_atmosphering_speed !== 'unknown' && (
                            <Badge variant="outline" className="text-xs">
                                {vehicle.max_atmosphering_speed} km/h
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Model:</span>
                    <span className="text-sm text-[#E5E7EB] truncate ml-2">{vehicle.model}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Length:</span>
                    <span className="text-sm text-[#E5E7EB]">{vehicle.length} m</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Crew:</span>
                    <span className="text-sm text-[#E5E7EB]">{vehicle.crew}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-[#94A3B8]">Passengers:</span>
                    <span className="text-sm text-[#E5E7EB]">{vehicle.passengers}</span>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA]/5 to-[#2DD4BF]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Card>
    );
}

const VehicleDetailModal = ({ vehicle, onClose }: VehicleDetailModalProps) => {
    if (!vehicle) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <Card className="card-galactic p-6 max-w-4xl w-full mx-4 relative z-10 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E5E7EB]">{vehicle.name}</h2>
                        <p className="text-[#94A3B8] mt-1">{vehicle.model}</p>
                    </div>
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
                                <Car className="w-5 h-5 mr-2" />
                                Basic Info
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Manufacturer</span>
                                    <span className="text-[#E5E7EB] font-medium">{vehicle.manufacturer}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Class</span>
                                    <span className="text-[#E5E7EB] font-medium">{vehicle.vehicle_class}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Length</span>
                                    <span className="text-[#E5E7EB] font-medium">{vehicle.length} meters</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Cost</span>
                                    <span className="text-[#E5E7EB] font-medium">{vehicle.cost_in_credits} credits</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#F59E0B] mb-3 flex items-center">
                                <Car className="w-5 h-5 mr-2" />
                                Performance
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Max Speed</span>
                                    <span className="text-[#E5E7EB] font-medium">{vehicle.max_atmosphering_speed} km/h</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Consumables</span>
                                    <span className="text-[#E5E7EB] font-medium">{vehicle.consumables}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#10B981] mb-3 flex items-center">
                                <Truck className="w-5 h-5 mr-2" />
                                Capacity
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Crew</span>
                                    <span className="text-[#E5E7EB] font-medium">{vehicle.crew}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Passengers</span>
                                    <span className="text-[#E5E7EB] font-medium">{vehicle.passengers}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Cargo Capacity</span>
                                    <span className="text-[#E5E7EB] font-medium">{vehicle.cargo_capacity} kg</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Pilots</span>
                                    <span className="text-[#E5E7EB] font-medium">{vehicle.pilots.length} known</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Featured in Films</span>
                                    <span className="text-[#E5E7EB] font-medium">{vehicle.films.length} movies</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

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
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Card className="card-galactic p-8 text-center">
                        <div className="text-red-400 mb-4">
                            <Car className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        </div>
                        <h2 className="text-xl font-semibold text-[#E5E7EB] mb-2">Error Loading Vehicles</h2>
                        <p className="text-[#94A3B8] mb-4">{error}</p>
                        <Button
                            onClick={() => loadVehicles(currentPage, search)}
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
        <AppShell title="Vehicles">
            <div className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E5E7EB] mb-2">Star Wars Vehicles</h2>
                        <p className="text-[#94A3B8]">
                            {loading ? 'Loading...' : `${totalCount} vehicles in the garage`}
                        </p>
                    </div>

                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                        <Input
                            placeholder="Search vehicles..."
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
                                <Card className="card-galactic p-4 h-72">
                                    <div className="flex items-start space-x-4 mb-4">
                                        <div className="w-16 h-16 rounded-lg bg-[#374151]" />
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
                            {vehicles.map((vehicle) => (
                                <VehicleCard
                                    key={vehicle.id}
                                    vehicle={vehicle}
                                    onClick={handleVehicleClick}
                                />
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-[#94A3B8]">
                                Showing page {currentPage} of the vehicle fleet
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

            <VehicleDetailModal
                vehicle={selectedVehicle}
                onClose={() => setSelectedVehicle(null)}
            />
        </AppShell>
    );
}
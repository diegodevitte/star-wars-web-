'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Car, Truck } from 'lucide-react';
import { VehicleCardProps } from '@/lib/types';

export default function VehicleCard({ vehicle, onClick }: VehicleCardProps) {
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
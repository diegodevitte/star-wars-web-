'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { PlanetDetailModalProps } from '@/lib/types';

export default function PlanetDetailModal({ planet, onClose }: PlanetDetailModalProps) {
    if (!planet) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <Card className="card-galactic p-3 sm:p-4 max-w-3xl w-full relative z-10 max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-3 sm:mb-4 flex-shrink-0">
                    <h2 className="text-lg sm:text-xl font-bold text-[#E5E7EB]">{planet.name}</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="text-[#94A3B8] hover:text-[#E5E7EB] h-8 w-8 p-0"
                    >
                        ✕
                    </Button>
                </div>

                <div className="overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        <div>
                            <h3 className="text-sm sm:text-base font-semibold text-[#60A5FA] mb-2 flex items-center">
                                <Globe className="w-4 h-4 mr-1.5" />
                                Physical
                            </h3>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Diameter:</span>
                                    <span className="text-[#E5E7EB]">{planet.diameter} km</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Gravity:</span>
                                    <span className="text-[#E5E7EB]">{planet.gravity}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Water:</span>
                                    <span className="text-[#E5E7EB]">{planet.surface_water}%</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm sm:text-base font-semibold text-[#10B981] mb-2">Environmental</h3>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Climate:</span>
                                    <span className="text-[#E5E7EB]">{planet.climate}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Terrain:</span>
                                    <span className="text-[#E5E7EB]">{planet.terrain}</span>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-2 lg:col-span-1">
                            <h3 className="text-sm sm:text-base font-semibold text-[#F87171] mb-2">Orbital & Social</h3>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Rotation:</span>
                                    <span className="text-[#E5E7EB]">{planet.rotation_period}h</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Orbit:</span>
                                    <span className="text-[#E5E7EB]">{planet.orbital_period}d</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Population:</span>
                                    <span className="text-[#E5E7EB]">{planet.population}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Residents:</span>
                                    <span className="text-[#E5E7EB]">{planet.residents.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Films:</span>
                                    <span className="text-[#E5E7EB]">{planet.films.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
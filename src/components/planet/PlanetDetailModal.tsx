'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { PlanetDetailModalProps } from '@/lib/types';

export default function PlanetDetailModal({ planet, onClose }: PlanetDetailModalProps) {
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
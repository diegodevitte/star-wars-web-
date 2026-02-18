'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, Zap, Shield } from 'lucide-react';
import { StarshipDetailModalProps } from '@/lib/types';

export default function StarshipDetailModal({ starship, onClose }: StarshipDetailModalProps) {
    if (!starship) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <Card className="card-galactic p-3 sm:p-4 max-w-4xl w-full relative z-10 max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-3 sm:mb-4 flex-shrink-0">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-[#E5E7EB]">{starship.name}</h2>
                        <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">{starship.model}</p>
                    </div>
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
                                <Rocket className="w-4 h-4 mr-1.5" />
                                Basic Info
                            </h3>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Manufacturer:</span>
                                    <span className="text-[#E5E7EB] text-right">{starship.manufacturer}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Class:</span>
                                    <span className="text-[#E5E7EB]">{starship.starship_class}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Length:</span>
                                    <span className="text-[#E5E7EB]">{starship.length}m</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Cost:</span>
                                    <span className="text-[#E5E7EB]">{starship.cost_in_credits}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm sm:text-base font-semibold text-[#F59E0B] mb-2 flex items-center">
                                <Zap className="w-4 h-4 mr-1.5" />
                                Performance
                            </h3>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Speed:</span>
                                    <span className="text-[#E5E7EB]">{starship.max_atmosphering_speed}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Hyperdrive:</span>
                                    <span className="text-[#E5E7EB]">{starship.hyperdrive_rating}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">MGLT:</span>
                                    <span className="text-[#E5E7EB]">{starship.MGLT}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Consumables:</span>
                                    <span className="text-[#E5E7EB]">{starship.consumables}</span>
                                </div>
                            </div>
                        </div>

                        <div className="sm:col-span-2 lg:col-span-1">
                            <h3 className="text-sm sm:text-base font-semibold text-[#10B981] mb-2 flex items-center">
                                <Shield className="w-4 h-4 mr-1.5" />
                                Capacity
                            </h3>
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Crew:</span>
                                    <span className="text-[#E5E7EB]">{starship.crew}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Passengers:</span>
                                    <span className="text-[#E5E7EB]">{starship.passengers}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Cargo:</span>
                                    <span className="text-[#E5E7EB]">{starship.cargo_capacity}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Pilots:</span>
                                    <span className="text-[#E5E7EB]">{starship.pilots.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#94A3B8]">Films:</span>
                                    <span className="text-[#E5E7EB]">{starship.films.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Rocket, Zap, Shield } from 'lucide-react';
import { StarshipDetailModalProps } from '@/lib/types';

export default function StarshipDetailModal({ starship, onClose }: StarshipDetailModalProps) {
    if (!starship) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <Card className="card-galactic p-6 max-w-4xl w-full mx-4 relative z-10 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-[#E5E7EB]">{starship.name}</h2>
                        <p className="text-[#94A3B8] mt-1">{starship.model}</p>
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
                                <Rocket className="w-5 h-5 mr-2" />
                                Basic Info
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Manufacturer</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.manufacturer}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Class</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.starship_class}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Length</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.length} meters</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Cost</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.cost_in_credits} credits</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#F59E0B] mb-3 flex items-center">
                                <Zap className="w-5 h-5 mr-2" />
                                Performance
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Max Speed</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.max_atmosphering_speed} km/h</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Hyperdrive Rating</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.hyperdrive_rating}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">MGLT</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.MGLT}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Consumables</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.consumables}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-[#10B981] mb-3 flex items-center">
                                <Shield className="w-5 h-5 mr-2" />
                                Capacity
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Crew</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.crew}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Passengers</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.passengers}</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Cargo Capacity</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.cargo_capacity} kg</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Pilots</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.pilots.length} known</span>
                                </div>
                                <div>
                                    <span className="text-sm text-[#94A3B8] block">Featured in Films</span>
                                    <span className="text-[#E5E7EB] font-medium">{starship.films.length} movies</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
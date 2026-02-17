'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PersonDetailModalProps } from '@/lib/types';

export default function PersonDetailModal({ person, onClose }: PersonDetailModalProps) {
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
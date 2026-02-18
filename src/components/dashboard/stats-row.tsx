'use client';

import { Card } from "@/components/ui/card";
import { Users, Globe, Rocket, Car } from "lucide-react";
import { StatCardProps, StatsRowProps } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function StatCard({ icon: Icon, label, value, accentColor, href }: StatCardProps) {
    const router = useRouter();

    const getAccentClass = () => {
        switch (accentColor) {
            case "#60A5FA": return "accent-bar-blue";
            case "#F87171": return "accent-bar-red";
            case "#2DD4BF": return "accent-bar-teal";
            default: return "accent-bar-blue";
        }
    };

    const handleClick = () => {
        router.push(href);
    };

    return (
        <Card
            className="card-galactic min-h-24 p-4 flex flex-col justify-between hover:scale-105 transition-transform duration-200 cursor-pointer shrink-0 w-full sm:w-auto"
            onClick={handleClick}
        >
            <div className="flex items-center justify-center mb-3">
                <div className="flex items-center space-x-2">
                    <Icon className="w-5 h-5 text-[#94A3B8]" />
                    <span className="text-sm font-medium text-[#94A3B8]">
                        {label}
                    </span>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <span className="text-3xl font-bold text-[#E5E7EB] mr-3">
                    {value}
                </span>
                <div className={`accent-bar ${getAccentClass()}`} />
            </div>
        </Card>
    );
}

export function StatsRow({ stats }: StatsRowProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const statCards = [
        {
            icon: Users,
            label: "People",
            value: stats.people,
            accentColor: "#60A5FA",
            href: "/people",
        },
        {
            icon: Globe,
            label: "Planets",
            value: stats.planets,
            accentColor: "#60A5FA",
            href: "/planets",
        },
        {
            icon: Rocket,
            label: "Starships",
            value: stats.starships,
            accentColor: "#F87171",
            href: "/starships",
        },
        {
            icon: Car,
            label: "Vehicles",
            value: stats.vehicles,
            accentColor: "#2DD4BF",
            href: "/vehicles",
        },
    ];

    useEffect(() => {
        const isMobile = window.innerWidth < 640;
        if (!isMobile || !scrollRef.current) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % statCards.length;
                if (scrollRef.current) {
                    const cardWidth = scrollRef.current.offsetWidth;
                    scrollRef.current.scrollTo({
                        left: nextIndex * cardWidth,
                        behavior: 'smooth'
                    });
                }
                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [statCards.length]);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            const scrollLeft = scrollContainer.scrollLeft;
            const cardWidth = scrollContainer.offsetWidth;
            const index = Math.round(scrollLeft / cardWidth);
            setCurrentIndex(index);
        };

        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="sm:hidden">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {statCards.map((stat, index) => (
                        <div key={index} className="snap-center w-full flex-shrink-0">
                            <StatCard
                                icon={stat.icon}
                                label={stat.label}
                                value={stat.value}
                                accentColor={stat.accentColor}
                                href={stat.href}
                            />
                        </div>
                    ))}
                </div>

                <div className="flex justify-center gap-2 mt-4">
                    {statCards.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setCurrentIndex(index);
                                if (scrollRef.current) {
                                    const cardWidth = scrollRef.current.offsetWidth;
                                    scrollRef.current.scrollTo({
                                        left: index * cardWidth,
                                        behavior: 'smooth'
                                    });
                                }
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index
                                ? 'w-8 bg-[#60A5FA]'
                                : 'w-2 bg-[#94A3B8]/30'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <StatCard
                        key={index}
                        icon={stat.icon}
                        label={stat.label}
                        value={stat.value}
                        accentColor={stat.accentColor}
                        href={stat.href}
                    />
                ))}
            </div>
        </>
    );
}
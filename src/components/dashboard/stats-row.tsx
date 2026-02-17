'use client';

import { Card } from "@/components/ui/card";
import { Users, Globe, Rocket, Car } from "lucide-react";
import { DashboardStats } from "@/lib/types";
import { useRouter } from "next/navigation";

interface StatCardProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: number;
    accentColor: string;
    href: string;
}

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
            className="card-galactic min-h-24 p-4 flex flex-col justify-between hover:scale-105 transition-transform duration-200 cursor-pointer"
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

interface StatsRowProps {
    stats: DashboardStats;
}

export function StatsRow({ stats }: StatsRowProps) {
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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    );
}
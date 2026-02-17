'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from "@/components/shell/app-shell";
import { StatsRow } from "@/components/dashboard/stats-row";
import { FeaturedCharacter } from "@/components/dashboard/featured-character";
import { RecentPlanets } from "@/components/dashboard/recent-planets";
import { PopularStarships } from "@/components/dashboard/popular-starships";
import { Card } from "@/components/ui/card";
import { Loader2, AlertTriangle } from "lucide-react";
import { statsApi, peopleApi, planetsApi, starshipsApi, ApiError } from '@/lib/api-client';
import { DashboardStats, Character, Planet, Starship } from '@/lib/types';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [featuredCharacter, setFeaturedCharacter] = useState<Character | null>(null);
  const [recentPlanets, setRecentPlanets] = useState<Planet[]>([]);
  const [popularStarships, setPopularStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedStats = await statsApi.getStats();
      const adaptedStats: DashboardStats = {
        people: fetchedStats.peopleCount,
        planets: fetchedStats.planetsCount,
        starships: fetchedStats.starshipsCount,
        vehicles: fetchedStats.vehiclesCount,
      };

      setStats(adaptedStats);

      try {
        const peopleData = await peopleApi.getAll();
        const allPeople = peopleData.results.slice(0, 10);
        const randomIndex = Math.floor(Math.random() * allPeople.length);
        const randomPerson = allPeople[randomIndex];

        setFeaturedCharacter({
          id: randomPerson.id,
          name: randomPerson.name,
          height: randomPerson.height,
          homeworld: randomPerson.homeworld,
        });
      } catch (err) {
        console.warn('Failed to load featured character');
      }

      try {
        const planetsData = await planetsApi.getAll();
        const allPlanets = planetsData.results.slice(0, 10);
        const shuffled = [...allPlanets].sort(() => Math.random() - 0.5);
        const planets = shuffled.slice(0, 3).map(planet => ({
          id: planet.id,
          name: planet.name,
          climate: planet.climate,
          terrain: planet.terrain,
          description: `A ${planet.climate} planet with ${planet.terrain} terrain.`,
        }));
        setRecentPlanets(planets);
      } catch (err) {
        console.warn('Failed to load recent planets');
      }

      try {
        const starshipsData = await starshipsApi.getAll();
        const allStarships = starshipsData.results.slice(0, 10);
        const shuffled = [...allStarships].sort(() => Math.random() - 0.5);
        const starships = shuffled.slice(0, 3).map(starship => ({
          id: starship.id,
          name: starship.name,
          model: starship.model,
          manufacturer: starship.manufacturer,
        }));
        setPopularStarships(starships);
      } catch (err) {
        console.warn('Failed to load popular starships');
      }

    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      let errorMessage = 'Failed to load dashboard data';

      if (err instanceof ApiError) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AppShell title="Dashboard">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="card-galactic p-8">
            <div className="flex items-center space-x-4 text-[#94A3B8]">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-lg">Loading galactic data...</span>
            </div>
          </Card>
        </div>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell title="Dashboard">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card className="card-galactic p-8 border-red-500/30">
            <div className="flex items-center space-x-4 text-red-400">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Error Loading Dashboard</h3>
                <p className="text-sm text-[#94A3B8]">{error}</p>
              </div>
            </div>
          </Card>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Dashboard">
      <div className="space-y-6">
        {stats && <StatsRow stats={stats} />}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            {featuredCharacter && <FeaturedCharacter character={featuredCharacter} />}
          </div>
          <div className="xl:col-span-1">
            {recentPlanets.length > 0 && <RecentPlanets planets={recentPlanets} />}
          </div>
        </div>
        {popularStarships.length > 0 && <PopularStarships starships={popularStarships} />}
      </div>
    </AppShell>
  );
}

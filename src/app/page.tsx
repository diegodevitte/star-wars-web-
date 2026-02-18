'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from "@/components/shell/app-shell";
import { StatsRow } from "@/components/dashboard/stats-row";
import { FeaturedCharacter } from "@/components/dashboard/featured-character";
import { RecentPlanets } from "@/components/dashboard/recent-planets";
import { PopularStarships } from "@/components/dashboard/popular-starships";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import PersonDetailModal from '@/components/people/PersonDetailModal';
import PlanetDetailModal from '@/components/planet/PlanetDetailModal';
import StarshipDetailModal from '@/components/starship/StarshipDetailModal';
import { statsApi, peopleApi, planetsApi, starshipsApi, ApiError } from '@/lib/api-client';
import { DashboardStats, Planet, Starship, NormalizedPerson, NormalizedPlanet, NormalizedStarship } from '@/lib/types';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [featuredCharacter, setFeaturedCharacter] = useState<NormalizedPerson | null>(null);
  const [recentPlanets, setRecentPlanets] = useState<NormalizedPlanet[]>([]);
  const [popularStarships, setPopularStarships] = useState<NormalizedStarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<NormalizedPerson | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<NormalizedPlanet | null>(null);
  const [selectedStarship, setSelectedStarship] = useState<NormalizedStarship | null>(null);

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

        setFeaturedCharacter(randomPerson);
      } catch (err) {
        console.warn('Failed to load featured character');
      }

      try {
        const planetsData = await planetsApi.getAll();
        const allPlanets = planetsData.results.slice(0, 10);
        const shuffled = [...allPlanets].sort(() => Math.random() - 0.5);
        const planets = shuffled.slice(0, 3);
        setRecentPlanets(planets);
      } catch (err) {
        console.warn('Failed to load recent planets');
      }

      try {
        const starshipsData = await starshipsApi.getAll();
        const allStarships = starshipsData.results.slice(0, 10);
        const shuffled = [...allStarships].sort(() => Math.random() - 0.5);
        const starships = shuffled.slice(0, 3);
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

  const handleViewDetails = () => {
    if (featuredCharacter) {
      setSelectedPerson(featuredCharacter);
    }
  };

  const handlePlanetClick = (planet: NormalizedPlanet) => {
    setSelectedPlanet(planet);
  };

  const handleStarshipClick = (starship: NormalizedStarship) => {
    setSelectedStarship(starship);
  };

  if (loading) {
    return (
      <AppShell title="Dashboard">
        <LoadingSkeleton type="spinner" message="Loading galactic data..." />
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
      <div className="space-y-4 sm:space-y-6">
        {stats && <StatsRow stats={stats} />}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            {featuredCharacter && <FeaturedCharacter character={featuredCharacter} onViewDetails={handleViewDetails} />}
          </div>
          <div className="lg:col-span-1">
            {recentPlanets.length > 0 && <RecentPlanets planets={recentPlanets} onPlanetClick={handlePlanetClick} />}
          </div>
        </div>
        {popularStarships.length > 0 && <PopularStarships starships={popularStarships} onStarshipClick={handleStarshipClick} />}
      </div>

      {selectedPerson && (
        <PersonDetailModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}

      {selectedPlanet && (
        <PlanetDetailModal
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}

      {selectedStarship && (
        <StarshipDetailModal
          starship={selectedStarship}
          onClose={() => setSelectedStarship(null)}
        />
      )}
    </AppShell>
  );
}

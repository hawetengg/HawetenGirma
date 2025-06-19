"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

interface HeroSectionProps {
  onSearch: (query: string) => void;
  searchTerm: string;
}

export default function HeroSection({
  onSearch,
  searchTerm,
}: HeroSectionProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchTerm);
  };

  return (
    <section className="bg-gradient-to-r from-orange-400 to-yellow-400 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Are you starving?
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Within a few clicks, find meals that are accessible near you
            </p>

            <form
              onSubmit={handleSearch}
              className="bg-white rounded-lg p-2 flex items-center shadow-lg"
            >
              <div className="flex items-center flex-1 px-4">
                <MapPin className="h-5 w-5 text-orange-500 mr-2" />
                <Input
                  type="text"
                  placeholder="Enter Your Address"
                  className="border-0 focus-visible:ring-0 text-gray-700"
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-px h-8 bg-gray-300 mx-2" />
              <div className="flex items-center flex-1 px-4">
                <Search className="h-5 w-5 text-orange-500 mr-2" />
                <Input
                  id="search-bar"
                  type="text"
                  placeholder="Find food"
                  className="border-0 focus-visible:ring-0 text-gray-700"
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8"
              >
                Find Food
              </Button>
            </form>
          </div>

          <div className="relative">
            <div className="w-96 h-96 mx-auto">
              <img
                src="/images/Food.png" // <--- **THIS LINE HAS BEEN CHANGED**
                alt="Delicious food bowl" // Alt text remains descriptive
                className="w-full h-full object-cover rounded-full shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client"

import { Button } from "@/components/ui/button"

interface HeaderProps {
  onAddFood: () => void
}

export default function Header({ onAddFood }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">🍕 FoodWagon</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">
              Browse Food
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">
              Pages
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 font-medium">
              Blog
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button onClick={onAddFood} className="bg-orange-500 hover:bg-orange-600 text-white">
              Add Meal
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

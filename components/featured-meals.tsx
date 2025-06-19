"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Star, MoreVertical, Edit, Trash2 } from "lucide-react";
import type { Food } from "@/types/food";

interface FeaturedMealsProps {
  foods: Food[];
  loading: boolean;
  onEditFood: (food: Food) => void;
  onDeleteFood: (food: Food) => void;
}

export default function FeaturedMeals({
  foods,
  loading,
  onEditFood,
  onDeleteFood,
}: FeaturedMealsProps) {
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Meals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Meals</h2>

        {foods.length === 0 ? (
          <div className="text-center py-12">
            <div className="empty-state-message text-gray-500 text-lg">
              No items available
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {foods.map((food) => (
              <Card
                key={food.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={food.avatar || "/placeholder.svg"}
                    alt={food.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/300x200?text=No+Image";
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-md text-sm font-semibold flex items-center">
                    <span className="mr-1">🏷️</span>
                    <span className="restaurant-price">
                      ${food.Price || "N/A"}
                    </span>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <img
                        src={food.logo || "/placeholder.svg"}
                        alt={food.name}
                        className="w-10 h-10 rounded-lg mr-3 bg-blue-500"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/40?text=Logo";
                        }}
                      />
                      <div>
                        <h3 className="restaurant-name font-semibold text-lg text-gray-800">
                          {food.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="restaurant-rating text-sm font-medium text-gray-700 ml-1">
                            {food.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onEditFood(food)}
                          className="cursor-pointer"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDeleteFood(food)}
                          className="cursor-pointer text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mt-4">
                    <span
                      className={`restaurant-status text-sm px-3 py-1 rounded-md font-medium ${
                        food.open
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {food.open ? "Open Now" : "Closed"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
            View All
          </Button>
        </div>
      </div>
    </section>
  );
}

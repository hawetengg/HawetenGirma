"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Food } from "@/types/food"; // Ensure this type is accurate for your API

interface EditFoodModalProps {
  food: Food;
  onClose: () => void;
  onSubmit: (food: Omit<Food, "id" | "createdAt">) => void;
}

interface FormErrors {
  name?: string;
  rating?: string;
  avatar?: string;
  logo?: string;
  open?: string;
  Price?: string;
}

export default function EditFoodModal({
  food,
  onClose,
  onSubmit,
}: EditFoodModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    avatar: "",
    logo: "",
    open: false,
    Price: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setFormData({
      name: food.name || "",
      rating: food.rating?.toString() || "",
      avatar: food.avatar || "",
      logo: food.logo || "",
      open: food.open ?? false,
      Price: food.Price || "",
    });
  }, [food]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Food Name (name): Remains required
    if (!formData.name.trim()) {
      newErrors.name = "Food name is required";
    }

    // Food Rating (rating): Optional, but if provided, must be a number between 0 and 5
    if (formData.rating.trim()) {
      const numRating = Number(formData.rating);
      if (isNaN(numRating)) {
        newErrors.rating = "Food Rating must be a number";
      } else if (numRating < 0 || numRating > 5) {
        newErrors.rating = "Food Rating must be between 0 and 5";
      }
    }

    // Food Image URL (avatar): Optional, but if provided, should be a valid image link
    if (
      formData.avatar.trim() &&
      !/^https?:\/\/.+\.(png|jpg|jpeg|gif|svg)$/i.test(formData.avatar.trim())
    ) {
      newErrors.avatar = "Food Image URL must be a valid image link";
    }

    // Restaurant Logo URL (logo): Validation completely removed as requested.
    // This field is now entirely optional and accepts any input, or no input.

    // Restaurant Status (open): Optional. If a selection is made, ensure it's a boolean.
    if (typeof formData.open !== "boolean") {
      newErrors.open = "Restaurant Status must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const dataToSubmit: Omit<Food, "id" | "createdAt"> = {
        name: formData.name,
        rating: formData.rating.trim() ? Number(formData.rating) : undefined,
        avatar: formData.avatar.trim() ? formData.avatar : undefined,
        logo: formData.logo.trim() ? formData.logo : undefined, // Still include if present, but no validation
        Price: formData.Price.trim() ? formData.Price : undefined,
        open: formData.open,
      } as Omit<Food, "id" | "createdAt">;

      onSubmit(dataToSubmit);
    }
  };

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">
          Edit Meal
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="edit_food_name"
              className="block text-sm text-gray-500 mb-1"
            >
              Food name
            </label>
            <Input
              id="edit_food_name"
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full p-3 bg-gray-100 border-0 rounded-lg text-gray-700 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {errors.name && (
              <p id="food-name-error" className="text-red-500 text-xs mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="edit_food_rating"
              className="block text-sm text-gray-500 mb-1"
            >
              Food rating
            </label>
            <Input
              id="edit_food_rating"
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => handleInputChange("rating", e.target.value)}
              className="w-full p-3 bg-gray-100 border-0 rounded-lg text-gray-700 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {errors.rating && (
              <p id="food-rating-error" className="text-red-500 text-xs mt-1">
                {errors.rating}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="edit_food_image"
              className="block text-sm text-gray-500 mb-1"
            >
              Food image (link)
            </label>
            <Input
              id="edit_food_image"
              name="avatar"
              type="url"
              value={formData.avatar}
              onChange={(e) => handleInputChange("avatar", e.target.value)}
              className="w-full p-3 bg-gray-100 border-0 rounded-lg text-gray-700 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {errors.avatar && (
              <p id="food-image-error" className="text-red-500 text-xs mt-1">
                {errors.avatar}
              </p>
            )}
          </div>

          {/* The 'restaurant_name' field remains commented out as it's not typically part of the Food type in MockAPI */}
          {/*
          <div>
            <label htmlFor="edit_restaurant_name" className="block text-sm text-gray-500 mb-1">
              Restaurant name
            </label>
            <Input
              id="edit_restaurant_name"
              name="restaurant_name"
              type="text"
              value={formData.restaurant_name}
              onChange={(e) => handleInputChange("restaurant_name", e.target.value)}
              className="w-full p-3 bg-gray-100 border-0 rounded-lg text-gray-700 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {errors.restaurant_name && (
              <p id="restaurant-name-error" className="text-red-500 text-xs mt-1">
                {errors.restaurant_name}
              </p>
            )}
          </div>
          */}

          <div>
            <label
              htmlFor="edit_restaurant_logo"
              className="block text-sm text-gray-500 mb-1"
            >
              Restaurant logo (link)
            </label>
            <Input
              id="edit_restaurant_logo"
              name="logo"
              type="url"
              value={formData.logo}
              onChange={(e) => handleInputChange("logo", e.target.value)}
              className="w-full p-3 bg-gray-100 border-0 rounded-lg text-gray-700 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {/* The error message for restaurant_logo is now completely removed from here */}
            {errors.logo && (
              <p
                id="restaurant-logo-error"
                className="text-red-500 text-xs mt-1"
              >
                {errors.logo}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="edit_restaurant_status"
              className="block text-sm text-gray-500 mb-1"
            >
              Restaurant status (open/close)
            </label>
            <Select
              name="open"
              value={formData.open ? "Open Now" : "Closed"}
              onValueChange={(value) =>
                handleInputChange("open", value === "Open Now")
              }
            >
              <SelectTrigger
                id="edit_restaurant_status"
                className="w-full p-3 bg-gray-100 border-0 rounded-lg text-gray-700 text-sm focus:ring-0 focus:ring-offset-0"
              >
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">open</SelectItem>
                <SelectItem value="Closed">closed</SelectItem>
              </SelectContent>
            </Select>
            {errors.open && (
              <p
                id="restaurant-status-error"
                className="text-red-500 text-xs mt-1"
              >
                {errors.open}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="edit_price"
              className="block text-sm text-gray-500 mb-1"
            >
              Price
            </label>
            <Input
              id="edit_price"
              name="Price"
              type="text"
              value={formData.Price}
              onChange={(e) => handleInputChange("Price", e.target.value)}
              className="w-full p-3 bg-gray-100 border-0 rounded-lg text-gray-700 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium text-sm"
            >
              Save
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 text-sm"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

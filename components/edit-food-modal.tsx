"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Food } from "@/types/food"

interface EditFoodModalProps {
  food: Food
  onClose: () => void
  onSubmit: (food: Omit<Food, "id">) => void
}

interface FormErrors {
  food_name?: string
  food_rating?: string
  food_image?: string
  restaurant_name?: string
  restaurant_logo?: string
  restaurant_status?: string
}

export default function EditFoodModal({ food, onClose, onSubmit }: EditFoodModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    food_rating: "",
    food_image: "",
    restaurant_name: "",
    restaurant_logo: "",
    restaurant_status: "",
    price: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})

  useEffect(() => {
    setFormData({
      name: food.name || "",
      food_rating: food.food_rating?.toString() || "",
      food_image: food.food_image || "",
      restaurant_name: food.restaurant_name || "",
      restaurant_logo: food.restaurant_logo || "",
      restaurant_status: food.restaurant_status || "",
      price: food.price || "",
    })
  }, [food])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.food_name = "Food name is required"
    }

    if (!formData.food_rating.trim()) {
      newErrors.food_rating = "Food Rating must be a number"
    } else if (isNaN(Number(formData.food_rating))) {
      newErrors.food_rating = "Food Rating must be a number"
    }

    if (!formData.food_image.trim()) {
      newErrors.food_image = "Food Image URL is required"
    }

    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = "Restaurant Name is required"
    }

    if (!formData.restaurant_logo.trim()) {
      newErrors.restaurant_logo = "Restaurant Logo URL is required"
    }

    if (!formData.restaurant_status.trim()) {
      newErrors.restaurant_status = "Restaurant Status must be 'Open Now' or 'Closed'"
    } else if (!["Open Now", "Closed"].includes(formData.restaurant_status)) {
      newErrors.restaurant_status = "Restaurant Status must be 'Open Now' or 'Closed'"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit({
        name: formData.name,
        food_rating: Number(formData.food_rating),
        food_image: formData.food_image,
        restaurant_name: formData.restaurant_name,
        restaurant_logo: formData.restaurant_logo,
        restaurant_status: formData.restaurant_status as "Open Now" | "Closed",
        price: formData.price,
      })
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md mx-auto p-6">
        <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">Edit Meal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Food name</label>
            <Input
              id="edit_food_name"
              name="food_name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full p-3 bg-gray-100 border-0 rounded-lg text-gray-700 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {errors.food_name && (
              <p id="food-name-error" className="text-red-500 text-xs mt-1">
                {errors.food_name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Food rating</label>
            <Input
              id="edit_food_rating"
              name="food_rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.food_rating}
              onChange={(e) => handleInputChange("food_rating", e.target.value)}
              className="w-full p-3 bg-gray-100 border-0 rounded-lg text-gray-700 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {errors.food_rating && (
              <p id="food-rating-error" className="text-red-500 text-xs mt-1">
                {errors.food_rating}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Food image (link)</label>
            <Input
              id="edit_food_image"
              name="food_image"
              type="url"
              value={formData.food_image}
              onChange={(e) => handleInputChange("food_image", e.target.value)}
              className="w-full p-3 bg-gray-100 border-0 rounded-lg text-gray-700 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {errors.food_image && (
              <p id="food-image-error" className="text-red-500 text-xs mt-1">
                {errors.food_image}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Restaurant name</label>
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

          <div>
            <label className="block text-sm text-gray-500 mb-1">Restaurant logo (link)</label>
            <Input
              id="edit_restaurant_logo"
              name="restaurant_logo"
              type="url"
              value={formData.restaurant_logo}
              onChange={(e) => handleInputChange("restaurant_logo", e.target.value)}
              className="w-full p-3 bg-gray-100 border-0 rounded-lg text-gray-700 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {errors.restaurant_logo && (
              <p id="restaurant-logo-error" className="text-red-500 text-xs mt-1">
                {errors.restaurant_logo}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Restaurant status (open/close)</label>
            <Select
              name="restaurant_status"
              value={formData.restaurant_status}
              onValueChange={(value) => handleInputChange("restaurant_status", value)}
            >
              <SelectTrigger className="w-full p-3 bg-gray-100 border-0 rounded-lg text-gray-700 text-sm focus:ring-0 focus:ring-offset-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">open</SelectItem>
                <SelectItem value="Closed">closed</SelectItem>
              </SelectContent>
            </Select>
            {errors.restaurant_status && (
              <p id="restaurant-status-error" className="text-red-500 text-xs mt-1">
                {errors.restaurant_status}
              </p>
            )}
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
  )
}

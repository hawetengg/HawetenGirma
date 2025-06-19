"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import FeaturedMeals from "@/components/featured-meals"
import Footer from "@/components/footer"
import AddFoodModal from "@/components/add-food-modal"
import EditFoodModal from "@/components/edit-food-modal"
import DeleteFoodModal from "@/components/delete-food-modal"
import type { Food } from "@/types/food"

const API_BASE_URL = "https://6852821e0594059b23cdd834.mockapi.io"

export default function Home() {
  const [foods, setFoods] = useState<Food[]>([])
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)

  // Fetch foods from API
  const fetchFoods = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/Food`)
      const data = await response.json()
      setFoods(data)
      setFilteredFoods(data)
    } catch (error) {
      console.error("Error fetching foods:", error)
    } finally {
      setLoading(false)
    }
  }

  // Search foods
  const searchFoods = async (query: string) => {
    setSearchTerm(query)
    if (!query.trim()) {
      setFilteredFoods(foods)
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/Food?name=${encodeURIComponent(query)}`)
      const data = await response.json()
      setFilteredFoods(data)
    } catch (error) {
      console.error("Error searching foods:", error)
      // Fallback to client-side filtering
      const filtered = foods.filter(
        (food) =>
          food.name.toLowerCase().includes(query.toLowerCase()) ||
          food.restaurant_name.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredFoods(filtered)
    }
  }

  // Add food
  const handleAddFood = async (foodData: Omit<Food, "id">) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Food`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodData),
      })

      if (response.ok) {
        await fetchFoods()
        setShowAddModal(false)
      }
    } catch (error) {
      console.error("Error adding food:", error)
    }
  }

  // Edit food
  const handleEditFood = async (foodData: Omit<Food, "id">) => {
    if (!selectedFood) return

    try {
      const response = await fetch(`${API_BASE_URL}/Food/${selectedFood.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(foodData),
      })

      if (response.ok) {
        await fetchFoods()
        setShowEditModal(false)
        setSelectedFood(null)
      }
    } catch (error) {
      console.error("Error editing food:", error)
    }
  }

  // Delete food
  const handleDeleteFood = async () => {
    if (!selectedFood) return

    try {
      const response = await fetch(`${API_BASE_URL}/Food/${selectedFood.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchFoods()
        setShowDeleteModal(false)
        setSelectedFood(null)
      }
    } catch (error) {
      console.error("Error deleting food:", error)
    }
  }

  const openEditModal = (food: Food) => {
    setSelectedFood(food)
    setShowEditModal(true)
  }

  const openDeleteModal = (food: Food) => {
    setSelectedFood(food)
    setShowDeleteModal(true)
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddFood={() => setShowAddModal(true)} />
      <HeroSection onSearch={searchFoods} searchTerm={searchTerm} />
      <FeaturedMeals
        foods={filteredFoods}
        loading={loading}
        onEditFood={openEditModal}
        onDeleteFood={openDeleteModal}
      />
      <Footer />

      {showAddModal && <AddFoodModal onClose={() => setShowAddModal(false)} onSubmit={handleAddFood} />}

      {showEditModal && selectedFood && (
        <EditFoodModal
          food={selectedFood}
          onClose={() => {
            setShowEditModal(false)
            setSelectedFood(null)
          }}
          onSubmit={handleEditFood}
        />
      )}

      {showDeleteModal && selectedFood && (
        <DeleteFoodModal
          foodName={selectedFood.name}
          onClose={() => {
            setShowDeleteModal(false)
            setSelectedFood(null)
          }}
          onConfirm={handleDeleteFood}
        />
      )}
    </div>
  )
}

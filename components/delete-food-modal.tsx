"use client"

import { Button } from "@/components/ui/button"

interface DeleteFoodModalProps {
  foodName: string
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteFoodModal({ foodName, onClose, onConfirm }: DeleteFoodModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">Delete Meal</h2>

        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          Are you sure you want to delete this meal? Actions cannot be reversed.
        </p>

        <div className="flex space-x-4">
          <Button
            onClick={onConfirm}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium"
          >
            Yes
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

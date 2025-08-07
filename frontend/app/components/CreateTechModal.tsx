"use client"
import { useState } from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreateSuccess: () => void
}

export default function CreateTechModal({ isOpen, onClose, onCreateSuccess }: Props) {
  const [name, setName] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !imageFile) {
      alert("Name and image are required.")
      return
    }

    const token = localStorage.getItem("token")
    if (!token) {
      alert("Unauthorized")
      return
    }

    const formData = new FormData()
    formData.append("name", name)
    formData.append("tech_image", imageFile)

    try {
      setLoading(true)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tech-stack`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!res.ok) throw new Error("Failed to create tech stack")

      onCreateSuccess()
      setName("")
      setImageFile(null)
      onClose()
    } catch (error) {
      console.error(error)
      alert("Failed to create tech stack")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md text-black">
        <h3 className="text-xl font-semibold mb-4">Add Tech Stack</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Tech Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Tech Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) setImageFile(file)
              }}
              className="w-full mt-1"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

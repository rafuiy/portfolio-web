"use client"
import { useEffect, useState } from "react"
import ExperienceItem from "./ExperienceItem"
import { jwtDecode } from "jwt-decode"
import DeleteModal from "@/app/components/DeleteModal"
import CreateExperienceModal from "@/app/components/CreateExperienceModal"

type Experience = {
  id: number
  instance: string
  position: string
  desc: string
  year: string
}

type DecodedToken = {
  role: string
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token)
        if (decoded.role === "admin") setIsAdmin(true)
      } catch (err) {
        console.error("Failed to decode token", err)
      }
    }

    const fetchExperiences = async () => {
      try {
        const headers: HeadersInit = {}
        if (token) headers.Authorization = `Bearer ${token}`

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/experience`, { headers })
        if (!res.ok) throw new Error("Failed to fetch experiences")

        const data: Experience[] = await res.json()
        setExperiences(data)
      } catch (err) {
        console.error("Error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  const handleDelete = async () => {
    if (selectedExperienceId === null) return
    const token = localStorage.getItem("token")
    if (!token) return

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/experience/${selectedExperienceId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })

    if (res.ok) {
      setExperiences(experiences.filter(e => e.id !== selectedExperienceId))
    }

    setShowDeleteModal(false)
    setSelectedExperienceId(null)
  }

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-[#1a1a2e] to-black text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
      <p className="text-gray-400 max-w-xl mx-auto mb-4">
        Along the way, I{"'"}ve worked on various projects that helped me grow both technically and creatively.
      </p>
       <div className="w-40 h-1 bg-white mb-16 mx-auto" />

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="relative flex flex-col items-center gap-10">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={exp.id}
              year={exp.year}
              title={exp.position}
              organization={exp.instance}
              description={exp.desc}
              isLast={index === experiences.length - 1}
              isAdmin={isAdmin}
              onEditClick={() => {
                setEditingExperience(exp)
                setShowCreateModal(true)
              }}
              onDeleteClick={() => {
                setSelectedExperienceId(exp.id)
                setShowDeleteModal(true)
              }}
            />
          ))}

          {isAdmin && (
            <button
              className="mt-10 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition"
              onClick={() => {
                setEditingExperience(null)
                setShowCreateModal(true)
              }}
            >
              + Add Experience
            </button>
          )}
        </div>
      )}

      <CreateExperienceModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateSuccess={() => window.location.reload()}
        editingData={editingExperience}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </section>
  )
}

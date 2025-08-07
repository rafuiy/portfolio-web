"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { jwtDecode } from "jwt-decode"
import CreateTechModal from "@/app/components/CreateTechModal"
import DeleteModal from "@/app/components/DeleteModal"

type TechStack = {
  id: number
  name: string
  tech_image: string
}

type DecodedToken = {
  role: string
}

export default function About() {
  const [techStack, setTechStack] = useState<TechStack[]>([])
  const [isAdmin, setIsAdmin] = useState(false)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTechId, setSelectedTechId] = useState<number | null>(null)

  // Ambil token dan cek role admin
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token)
        if (decoded.role === "admin") setIsAdmin(true)
      } catch (err) {
        console.error("Token invalid:", err)
      }
    }

    const fetchTechStack = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tech-stack`)
        const data = await res.json()
        setTechStack(data)
      } catch (error) {
        console.error("Failed to fetch tech stack:", error)
      }
    }

    fetchTechStack()
  }, [])

  const handleDelete = async () => {
    const token = localStorage.getItem("token")
    if (!token || selectedTechId === null) return

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tech-stack/${selectedTechId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })

    if (res.ok) {
      setTechStack((prev) => prev.filter((tech) => tech.id !== selectedTechId))
    }

    setShowDeleteModal(false)
    setSelectedTechId(null)
  }

  return (
    <section id="about" className="text-center py-20 bg-[#1a1a2e]">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        What’s Under the Hood
      </h2>
      <p className="text-white-300 max-w-xl mx-auto mb-2">
        I enjoy working with tools that help me create smooth, responsive, and
        scalable web applications from designing sleek user interfaces to
        building high-performance backends.
      </p>
      <p className="text-white-400 max-w-2xl mx-auto mb-10">
        My workflow revolves around modern JavaScript frameworks, powerful
        backend architectures, and clean, maintainable code.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {techStack.map((tech) => (
          <div
            key={tech.id}
            className="relative w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#232323] hover:bg-[#333] flex items-center justify-center shadow-md transition group"
          >
           <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${tech.tech_image}`}
            alt={tech.name}
            width={30}
            height={30}
            title={tech.name}
          />
            {isAdmin && (
              <button
                onClick={() => {
                  setSelectedTechId(tech.id)
                  setShowDeleteModal(true)
                }}
                className="absolute top-0 right-0 bg-red-600 text-xs rounded-full px-1 text-white opacity-80 hover:opacity-100"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {isAdmin && (
        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-10 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition"
        >
          + Add Tech Stack
        </button>
      )}

      <CreateTechModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateSuccess={() => window.location.reload()}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </section>
  )
}

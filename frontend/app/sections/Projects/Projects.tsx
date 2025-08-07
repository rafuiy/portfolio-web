"use client"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import ProjectCard from "./ProjectCard"
import CreateProjectModal from "@/app/components/CreateProjectModal"
import DeleteModal from "@/app/components/DeleteModal"

type Project = {
  id: number
  title: string
  project_instance: string
  preview_description: string
  project_icon: string
  techstacks: { id: number; tech_image: string }[]
  link_project: string
}

type DecodedToken = {
  role: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)


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

    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/projects`)
        const data = await res.json()
        setProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      }
    }

    fetchProjects()
  }, [])

  const handleDelete = async () => {
  const token = localStorage.getItem("token")
  if (!token || selectedProjectId === null) return

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/projects/${selectedProjectId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (res.ok) {
      setProjects((prev) =>
        prev.filter((project) => project.id !== selectedProjectId)
      )
    } else {
      console.error("Gagal menghapus project")
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat delete:", error)
  }

  setShowDeleteModal(false)
  setSelectedProjectId(null)
  }


  return (
    <section id="projects" className="py-16 px-6 md:px-20 bg-[#000]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-white">My Recent Works</h2>
        {isAdmin && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            + Add Project
          </button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {projects.map((project) => (
          <div key={project.id} className="relative">
            <ProjectCard
              image={
                project.project_icon
                  ? `${process.env.NEXT_PUBLIC_API_URL}${project.project_icon}`
                  : "/default-image.png"
              }
              title={project.title}
              stackIcons={
                project.techstacks
                  ? project.techstacks
                      .filter(ts => ts.tech_image)
                      .map(ts => `${process.env.NEXT_PUBLIC_API_URL}${ts.tech_image}`)
                  : []
              }
              client={project.project_instance}
              description={project.preview_description || ""}
              detailUrl="#"
              previewUrl={project.link_project || "#"}
            />

            {isAdmin && (
              <button
                onClick={() => {
                  setSelectedProjectId(project.id)
                  setShowDeleteModal(true)
                }}
                className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 hover:bg-red-700 z-10"
                title="Hapus Project"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>


      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onProjectCreated={() => {
          setIsCreateOpen(false)
          // Re-fetch project list after creation
          const refresh = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/projects`)
            const data = await res.json()
            setProjects(data)
          }
          refresh()
        }}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />

    </section>
  )
}

"use client";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProjectCard from "./ProjectCard";
import CreateProjectModal from "@/app/components/CreateProjectModal";
import DeleteModal from "@/app/components/DeleteModal";
import { motion, useReducedMotion } from "framer-motion";

type Project = {
  id: number;
  title: string;
  project_instance: string;
  preview_description: string;
  project_icon: string;
  techstacks: { id: number; tech_image: string }[];
  link_project: string;
};

type DecodedToken = { role: string };

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  // ===== Framer Motion setup (durasi 2s) =====
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const DUR = 2;
  const STAGGER = 0.18;

  // Item target (awal ditangani Tailwind class agar SSR & CSR sama)
  const fadeItem = {
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : DUR, ease },
    },
  };

  // Container untuk stagger
  const fadeContainer = {
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : STAGGER,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (decoded.role === "admin") setIsAdmin(true);
      } catch (err) {
        console.error("Token invalid:", err);
      }
    }

    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token || selectedProjectId === null) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/projects/${selectedProjectId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.ok) {
        setProjects((prev) => prev.filter((project) => project.id !== selectedProjectId));
      } else {
        console.error("Gagal menghapus project");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat delete:", error);
    }

    setShowDeleteModal(false);
    setSelectedProjectId(null);
  };

  return (
    <section id="projects" className="py-16 px-6 md:px-20 bg-[#000]">
      <div className="flex justify-between items-center mb-10">
        {/* H2 fade-up */}
        <motion.h2
          className="text-3xl font-bold text-white opacity-0 translate-y-6 will-change-transform"
          variants={fadeItem}
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          My Recent Works
        </motion.h2>

        {isAdmin && (
          <motion.button
            onClick={() => setIsCreateOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded opacity-0 translate-y-6 will-change-transform"
            variants={fadeItem}
            initial={false}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            + Add Project
          </motion.button>
        )}
      </div>

      {/* Grid container dengan stagger */}
      <motion.div
        className="flex flex-wrap justify-center gap-6"
        variants={fadeContainer}
        initial={false}
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={fadeItem}
            className="relative opacity-0 translate-y-6 will-change-transform"
            whileHover={{ y: reduceMotion ? 0 : -4 }}
          >
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
                      .filter((ts) => ts.tech_image)
                      .map((ts) => `${process.env.NEXT_PUBLIC_API_URL}${ts.tech_image}`)
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
                  setSelectedProjectId(project.id);
                  setShowDeleteModal(true);
                }}
                className="absolute top-2 right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5 hover:bg-red-700 z-10"
                title="Hapus Project"
              >
                ×
              </button>
            )}
          </motion.div>
        ))}
      </motion.div>

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onProjectCreated={async () => {
          setIsCreateOpen(false);
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/projects`);
          const data = await res.json();
          setProjects(data);
        }}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}

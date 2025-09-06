"use client";
import { useEffect, useState } from "react";
import ExperienceItem from "./ExperienceItem";
import { jwtDecode } from "jwt-decode";
import DeleteModal from "@/app/components/DeleteModal";
import CreateExperienceModal from "@/app/components/CreateExperienceModal";
import { motion, useReducedMotion } from "framer-motion";

type Experience = {
  id: number;
  instance: string;
  position: string;
  desc: string;
  year: string;
};

type DecodedToken = { role: string };

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(null);

  // ===== Framer Motion setup (durasi 2 detik) =====
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const DUR = 2;
  const STAGGER = 0.25;

  // Item: state awal pakai class Tailwind (agar SSR & CSR sama), target "show" di sini
  const fadeItem = {
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : DUR, ease },
    },
  };

  // Container untuk stagger anak-anaknya
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
        console.error("Failed to decode token", err);
      }
    }

    const fetchExperiences = async () => {
      try {
        const headers: HeadersInit = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/experience`, { headers });
        if (!res.ok) throw new Error("Failed to fetch experiences");

        const data: Experience[] = await res.json();
        setExperiences(data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const handleDelete = async () => {
    if (selectedExperienceId === null) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/experience/${selectedExperienceId}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.ok) {
      setExperiences((prev) => prev.filter((e) => e.id !== selectedExperienceId));
    }

    setShowDeleteModal(false);
    setSelectedExperienceId(null);
  };

  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-b from-[#1a1a2e] to-black text-white text-center px-6"
    >
      {/* Heading */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-4 opacity-0 translate-y-6 will-change-transform"
        variants={fadeItem}
        initial={false}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        Experience
      </motion.h2>

      {/* Subheading */}
      <motion.p
        className="text-gray-400 max-w-xl mx-auto mb-4 opacity-0 translate-y-6 will-change-transform"
        variants={fadeItem}
        initial={false}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        Along the way, I{"'"}ve worked on various projects that helped me grow both technically and creatively.
      </motion.p>

      {/* Divider */}
      <motion.div
        className="w-40 h-1 bg-white mb-16 mx-auto opacity-0 translate-y-6 will-change-transform"
        variants={fadeItem}
        initial={false}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      />

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        // Container list untuk stagger item
        <motion.div
          className="relative flex flex-col items-center gap-10"
          variants={fadeContainer}
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={fadeItem}
              className="w-full opacity-0 translate-y-6 will-change-transform"
              whileHover={{ y: reduceMotion ? 0 : -4 }}
            >
              <ExperienceItem
                year={exp.year}
                title={exp.position}
                organization={exp.instance}
                description={exp.desc}
                isLast={false /* biar aman, kalau komponen butuh, bisa kirim index check di sini */}
                isAdmin={isAdmin}
                onEditClick={() => {
                  setEditingExperience(exp);
                  setShowCreateModal(true);
                }}
                onDeleteClick={() => {
                  setSelectedExperienceId(exp.id);
                  setShowDeleteModal(true);
                }}
              />
            </motion.div>
          ))}

          {isAdmin && (
            <motion.button
              className="mt-10 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition opacity-0 translate-y-6 will-change-transform"
              variants={fadeItem}
              initial={false}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              onClick={() => {
                setEditingExperience(null);
                setShowCreateModal(true);
              }}
            >
              + Add Experience
            </motion.button>
          )}
        </motion.div>
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
  );
}

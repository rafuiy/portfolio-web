"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import CreateTechModal from "@/app/components/CreateTechModal";
import DeleteModal from "@/app/components/DeleteModal";
import { motion, useReducedMotion } from "framer-motion";

type TechStack = { id: number; name: string; tech_image: string };
type DecodedToken = { role: string };

export default function About() {
  const [techStack, setTechStack] = useState<TechStack[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTechId, setSelectedTechId] = useState<number | null>(null);

  // === Motion setup ===
 const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const DUR = 2;            // <-- lama animasi 2 detik
  const STAGGER = 0.25;     // opsional: interval muncul berurutan

  // Item: state awal tetap dari class Tailwind (opacity-0 translate-y-6)
  const fadeItem = {
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : DUR, ease },
    },
  };

  // Container: untuk stagger anak-anaknya
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

    const fetchTechStack = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tech-stack`);
        const data = await res.json();
        setTechStack(data);
      } catch (error) {
        console.error("Failed to fetch tech stack:", error);
      }
    };

    fetchTechStack();
  }, []);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token || selectedTechId === null) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tech-stack/${selectedTechId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) setTechStack((prev) => prev.filter((tech) => tech.id !== selectedTechId));

    setShowDeleteModal(false);
    setSelectedTechId(null);
  };

  return (
    <section id="about" className="text-center py-20 px-6 bg-[#1a1a2e]">
      {/* H2: initial pakai class, animasi via whileInView */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-white mb-6 opacity-0 translate-y-6 will-change-transform"
        variants={fadeItem}
        initial={false}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        What’s Under the Hood
      </motion.h2>

      {/* Paragraf: bungkus container untuk stagger */}
      <motion.div
        className="max-w-2xl mx-auto"
        variants={fadeContainer}
        initial={false}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p
          className="text-white-300 max-w-xl mx-auto mb-2 opacity-0 translate-y-6 will-change-transform"
          variants={fadeItem}
        >
          I enjoy working with tools that help me create smooth, responsive, and
          scalable web applications from designing sleek user interfaces to
          building high-performance backends.
        </motion.p>

        <motion.p
          className="text-white-400 max-w-2xl mx-auto mb-10 opacity-0 translate-y-6 will-change-transform"
          variants={fadeItem}
        >
          My workflow revolves around modern JavaScript frameworks, powerful
          backend architectures, and clean, maintainable code.
        </motion.p>
      </motion.div>

      {/* Grid Tech Stack */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 md:gap-6 mt-8"
        variants={fadeContainer}
        initial={false}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {techStack.map((tech) => (
          <motion.div
            key={tech.id}
            variants={fadeItem}
            whileHover={{ y: reduceMotion ? 0 : -4 }}
            className="relative sm:w-10 sm:h-10 w-14 h-14 rounded-full bg-[#232323] hover:bg-[#333] flex items-center justify-center shadow-md transition group opacity-0 translate-y-6 will-change-transform"
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
                  setSelectedTechId(tech.id);
                  setShowDeleteModal(true);
                }}
                className="absolute top-0 right-0 bg-red-600 text-xs rounded-full px-1 text-white opacity-80 hover:opacity-100"
              >
                ×
              </button>
            )}
          </motion.div>
        ))}
      </motion.div>

      {isAdmin && (
        <motion.button
          onClick={() => setShowCreateModal(true)}
          className="mt-10 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-semibold transition opacity-0 translate-y-6 will-change-transform"
          variants={fadeItem}
          initial={false}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          + Add Tech Stack
        </motion.button>
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
  );
}

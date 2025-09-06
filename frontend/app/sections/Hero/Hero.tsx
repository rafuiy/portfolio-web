'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
  // Motion setup (durasi 2 detik)
  const reduceMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const DUR = 2;
  const STEP = 0.15; // jeda antar elemen teks

  // Variants (state awal di-handle Tailwind classes)
  const fadeRight = { show: { opacity: 1, x: 0, transition: { duration: reduceMotion ? 0 : DUR, ease } } };
  const fadeLeft  = { show: { opacity: 1, x: 0, transition: { duration: reduceMotion ? 0 : DUR, ease } } };
  const fadeUp    = { show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : DUR, ease } } };

  // Container untuk stagger elemen teks kiri
  const textContainer = {
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : STEP,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  return (
    <section
      id="home"
      className="hero w-full min-h-screen flex items-center justify-between px-6 md:px-20 py-12 bg-gradient-to-b from-[#2a154b] to-[#1a1a2e] text-white relative overflow-hidden"
    >
      {/* Kiri: teks (fade ke kanan) */}
      <motion.div
        className="max-w-xl z-10"
        variants={textContainer}
        initial={false}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold leading-tight mb-6 opacity-0 translate-x-6 will-change-transform"
          variants={fadeRight}
        >
          Code.  Design. <br /> Deliver.
        </motion.h1>

        <motion.p
          className="text-lg text-white-300 mb-4 opacity-0 translate-x-6 will-change-transform"
          variants={fadeRight}
        >
          I{"'"}m a Web Developer passionate about crafting responsive, user-focused, and aesthetically pleasing digital experiences.
        </motion.p>

        <motion.p
          className="text-lg text-gray-300 mb-6 opacity-0 translate-x-6 will-change-transform"
          variants={fadeRight}
        >
          I thrive on learning new technologies and turning ideas into impactful solutions.<br /> Always learning, always coding.
        </motion.p>

        <motion.button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md flex items-center gap-2 transition opacity-0 translate-x-6 will-change-transform"
          variants={fadeRight}
          onClick={() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          whileHover={{ y: reduceMotion ? 0 : -2 }}
        >
          Let’s Connect
          <span className="text-lg">↗</span>
        </motion.button>
      </motion.div>

      {/* Kanan: Foto (fade ke kiri) */}
      <motion.div
        className="relative hidden md:block z-10 opacity-0 -translate-x-6 will-change-transform"
        variants={fadeLeft}
        initial={false}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="relative w-[420px] h-[500px]">
          <Image
            src="/images/her.png"
            alt="Rafi"
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      </motion.div>

      {/* Decoration: fade-up */}
      <motion.div
        className="absolute left-8 bottom-16 opacity-0 translate-y-6 will-change-transform"
        initial={false}
        whileInView={{
          opacity: 0.4,         // final sama seperti opacity-40
          y: 0,
          transition: { duration: DUR, ease },
        }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="5">
          <circle cx="50" cy="50" r="30" />
          <circle cx="65" cy="65" r="30" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-10 right-20 w-10 h-1 bg-white opacity-0 translate-y-6 will-change-transform"
        variants={fadeUp}
        initial={false}
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      />
      <motion.div
        className="absolute bottom-16 right-10 border-l-[12px] border-r-[12px] border-b-[20px] border-transparent border-b-white opacity-0 translate-y-6 will-change-transform"
        variants={fadeUp}
        initial={false}
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      />
    </section>
  );
}

'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section id='home' className="hero w-full min-h-screen flex items-center justify-between px-6 md:px-20 py-12 bg-gradient-to-b from-[#2a154b] to-[#1a1a2e] text-white relative overflow-hidden">
      {/* Kiri */}
      <div className="max-w-xl z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Code.  Design. <br /> Deliver.
        </h1>
        <p className="text-lg text-white-300 mb-4">
          I{"'"}m a Web Developer passionate about crafting responsive, user-focused, and aesthetically pleasing digital experiences.
        </p>
        <p className="text-lg text-white-400 mb-6">
          I thrive on learning new technologies and turning ideas into impactful solutions.<br /> Always learning, always coding.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md flex items-center gap-2 transition">
          Let’s Connect
          <span className="text-lg">↗</span>
        </button>
      </div>

      {/* Kanan - Foto */}
      <div className="relative hidden md:block z-10">
        <div className="relative w-[420px] h-[500px]">
          <Image
            src="/images/her.png" // letakkan gambarnya di /public/rafi.png
            alt="Rafi"
            fill
            className="object-cover rounded-xl"
          />
        </div>
       </div>

      {/* Dekorasi background (misal zigzag, circle, triangle) */}
      <div className="absolute bottom-10 left-10 w-6 h-6 border border-white rotate-45" />
      <div className="absolute top-10 right-20 w-10 h-1 bg-white" />
      <div className="absolute bottom-16 right-10 border-l-[12px] border-r-[12px] border-b-[20px] border-transparent border-b-white" />
    </section>
  );
}

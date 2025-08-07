export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 md:px-20 bg-[#121212] text-white relative">
      <div className=" text-left">
        <h2 className="text-4xl font-bold mb-6">Coffee &amp; Code? Let’s Talk</h2>
        <p className="text-gray-300 mb-1">
          Whether it{"'"}s a full-scale project, a freelance opportunity, or just a conversation about tech.
          I{"'"}m always open to connecting.
        </p>
        <p className="text-gray-400 mb-8">
          Feel free to reach out, and let’s see how we can build something great together.
        </p>
        <a
          href="mailto:raafiputraa2@gmail.com"
          className="inline-block px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-sm font-semibold transition"
        >
          Let’s Connect!
        </a>
      </div>
      <div className="absolute right-8 bottom-8 opacity-40">
        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="5">
          <circle cx="50" cy="50" r="30" />
          <circle cx="65" cy="65" r="30" />
        </svg>
      </div>
    </section>
  )
}

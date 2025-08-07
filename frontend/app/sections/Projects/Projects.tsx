import ProjectCard from "./ProjectCard"

const dummyProjects = [
  {
    image: "/projects/squidgame-ui.png",
    title: "Desc Website apa?",
    stackIcons: ["/icons/html.svg", "/icons/css.svg", "/icons/js.svg"],
    client: "Mikrotrans Bambu Apus",
    description: "Create a platform with the best and coolest quality from us. Create a platform with the best and coolest quality from us.",
    detailUrl: "#",
    previewUrl: "#"
  },
  // ...tambahkan lebih banyak data sesuai kebutuhan
]

export default function Projects() {
  return (
    <section id="projects" className="py-16 px-6 md:px-20 bg-[#000]">
      <h2 className="text-3xl font-bold text-white mb-10 text-left">My Recent Works</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {dummyProjects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </section>
  )
}

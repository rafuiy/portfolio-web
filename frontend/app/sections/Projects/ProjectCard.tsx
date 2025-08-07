import Image from "next/image"

type ProjectCardProps = {
  image: string
  title: string
  stackIcons: string[]
  client: string
  description: string
  detailUrl: string
  previewUrl: string
}

export default function ProjectCard({
  image,
  title,
  stackIcons,
  client,
  description,
  // detailUrl,
  previewUrl
}: ProjectCardProps) {
  return (
    <div className="bg-[#1c1c24] rounded-xl p-4 w-full max-w-sm">
      <div className="rounded-lg overflow-hidden mb-4">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full h-auto object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <div className="flex gap-2 text-primary mb-2">
        {stackIcons.map((icon, idx) => (
          <Image
            key={idx}
            src={icon}
            alt={`stack-icon-${idx}`}
            width={20}
            height={20}
            className="w-5 h-5"
          />
        ))}
      </div>
      <p className="text-sm text-gray-300 mb-1">{client}</p>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <div className="flex gap-2">
        {/* <a href={detailUrl} className="px-4 py-1 bg-primary text-white rounded-md text-sm bg-indigo-700">
          Details
        </a> */}
        <a
          href={previewUrl.startsWith('http') ? previewUrl : `https://${previewUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1 bg-white text-indigo-700 font-bold rounded-md text-sm"
        >
          Preview
        </a>
      </div>
    </div>
  )
}

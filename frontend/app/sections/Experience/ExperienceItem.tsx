type Props = {
  year: string
  title: string
  organization: string
  description?: string
  isLast?: boolean
  isAdmin?: boolean
  onDeleteClick?: () => void
  onEditClick?: () => void
}

export default function ExperienceItem({ year, title, organization, description, isLast, isAdmin, onDeleteClick, onEditClick }: Props) {
  return (
    <div className="relative z-10 flex flex-col justify-center items-center text-center">
      <div className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold mb-2">{year}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-300">{organization}</p>
      {description && <p className="text-gray-400 text-sm">{description}</p>}

      {isAdmin && (
        <div className="flex gap-3 mt-2">
          <button
            className="text-blue-400 hover:text-blue-600 text-sm"
            onClick={onEditClick}
          >
            Edit
          </button>
          <button onClick={onDeleteClick} className="text-red-400 hover:text-red-600 text-sm">
            Delete
          </button>
        </div>
      )}

      <div className="w-3 h-3 bg-white rounded-full mt-4" />
      {!isLast && <div className="w-1 h-40 bg-white left-1/2 transform z-0" />}
    </div>
  )
}

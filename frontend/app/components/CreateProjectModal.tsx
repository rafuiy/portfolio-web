"use client"
import { useEffect, useState } from "react"

type TechStack = {
  id: number
  name: string
  tech_image: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onProjectCreated: () => void
}

export default function CreateProjectModal({ isOpen, onClose, onProjectCreated }: Props) {
  const [title, setTitle] = useState("")
  const [instance, setInstance] = useState("")
  const [description, setDescription] = useState("")
  const [icon, setIcon] = useState("")
  const [linkProject, setLinkProject] = useState("")
  const [selectedTechIds, setSelectedTechIds] = useState<number[]>([])
  const [techstacks, setTechstacks] = useState<TechStack[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [iconFile, setIconFile] = useState<File | null>(null)
  const [uploadedIconPath, setUploadedIconPath] = useState<string>("")


  useEffect(() => {
    if (isOpen) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/tech-stack`)
        .then(res => res.json())
        .then(data => setTechstacks(data))
        .catch(err => console.error("Failed to fetch techstacks:", err))
    }
  }, [isOpen])

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  const token = localStorage.getItem("token");
  if (!token) {
    setError("Token tidak tersedia. Silakan login ulang.");
    setLoading(false);
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("project_instance", instance);
  formData.append("preview_description", description);
  formData.append("techstack_ids", JSON.stringify(selectedTechIds)); // Kirim array sebagai JSON string
  formData.append("link_project", linkProject)
  if (iconFile) {
    formData.append("project_icon", iconFile); // harus sesuai nama field di backend
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // ❗JANGAN tambahkan "Content-Type", browser akan otomatis set ke multipart
      },
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData?.error || "Gagal menyimpan project");
    }

    onProjectCreated();
    onClose();

    // Reset form
    setTitle("");
    setInstance("");
    setDescription("");
    setIconFile(null);
    setLinkProject("")
    setSelectedTechIds([]);
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Terjadi kesalahan saat menyimpan");
    }
  } finally {
    setLoading(false);
  }
};


  const toggleTech = (id: number) => {
    setSelectedTechIds(prev =>
      prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center text-[#000]">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Create Project</h2>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Client / Instance"
            value={instance}
            onChange={e => setInstance(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
         <input
            type="file"
            accept="image/*"
            onChange={(e) => {
                if (e.target.files?.[0]) {
                setIconFile(e.target.files[0]);
                }
            }}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            placeholder="Short Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="text"
            name="link_project"
            placeholder="Link ke Project"
            value={linkProject}
            onChange={e => setLinkProject(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
          />


          <div>
            <p className="mb-2 font-medium">Select Tech Stack:</p>
            <div className="flex flex-wrap gap-2">
              {techstacks.map(ts => (
                <button
                  type="button"
                  key={ts.id}
                  onClick={() => toggleTech(ts.id)}
                  className={`px-3 py-1 border rounded ${
                    selectedTechIds.includes(ts.id) ? "bg-blue-600 text-white" : "bg-gray-100"
                  }`}
                >
                  {ts.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

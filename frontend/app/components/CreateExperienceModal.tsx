"use client"

import { useState, useEffect } from "react"

type Experience = {
  id?: number
  year: string
  position: string
  instance: string
  desc: string
}

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreateSuccess: () => void
  editingData?: Experience | null
}

export default function CreateExperienceModal({
  isOpen,
  onClose,
  onCreateSuccess,
  editingData,
}: Props) {
  const [form, setForm] = useState<Experience>({
    year: "",
    position: "",
    instance: "",
    desc: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (editingData) {
      setForm(editingData)
    } else {
      setForm({ year: "", position: "", instance: "", desc: "" })
    }
  }, [editingData, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("Token tidak tersedia")

      const url = editingData
        ? `${process.env.NEXT_PUBLIC_API_URL}/admin/experience/${editingData.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/admin/experience`

      const method = editingData ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Gagal menyimpan data")

      onCreateSuccess()
      onClose()
    } catch (err) {
      console.error(err)
      setError("Terjadi kesalahan saat menyimpan")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-md w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          {editingData ? "Edit Pengalaman" : "Tambah Pengalaman"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="year"
            placeholder="Tahun"
            value={form.year}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="position"
            placeholder="Posisi"
            value={form.position}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="instance"
            placeholder="Instansi/Perusahaan"
            value={form.instance}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="desc"
            placeholder="Deskripsi"
            value={form.desc}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={4}
          />

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Menyimpan..." : editingData ? "Update" : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

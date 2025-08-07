// components/DeleteModal.tsx
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({ isOpen, onClose, onConfirm }: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-80">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Hapus Item ini</h3>
        <p className="text-gray-600 mb-6">Apakah kamu yakin ingin menghapus data ini?</p>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Batal</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Hapus</button>
        </div>
      </div>
    </div>
  );
}

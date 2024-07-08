"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Line = {
  id_line: number;
  nama_line: string;
  status_line: string;
};

type DeleteLineProps = {
  line: Line;
  onLineDeleted: () => void;
};

export default function DeleteLine({ line, onLineDeleted }: DeleteLineProps) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(id: number) {
    setIsMutating(true);

    await fetch(`http://localhost:3000/api/line/${id}`, {
      method: "DELETE",
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);

    onLineDeleted();
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button
        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleChange}
      >
        Delete
      </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete {line.nama_line} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(line.id_line)}
                className="btn btn-primary"
              >
                Delete
              </button>
            ) : (
              <button type="button" className="btn loading">
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

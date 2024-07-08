"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Parts = {
  part_id: string;
  part_name: string;
};

type DeletePartProps = {
  partsDetail: Parts;
  onPartsDeleted: () => void;
};

export default function DeleteParts({ partsDetail, onPartsDeleted }: DeletePartProps) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(id: number) {
    setIsMutating(true);

    await fetch(`http://localhost:3000/api/parts/${partsDetail.part_id}`, {
      method: "DELETE",
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);

    onPartsDeleted();
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
            Are sure to delete {partsDetail.part_name} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(Number(partsDetail.part_id))}
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

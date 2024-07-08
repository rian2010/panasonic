"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Machine = {
  id_mesin: number;
  id_line: number;
  nama_mesin: string;
};

type DeleteMachineProps = {
  machine: Machine;
  onMachineDeleted: () => void;
};

export default function DeleteMachine({ machine, onMachineDeleted }: DeleteMachineProps) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(id: number) {
    setIsMutating(true);

    await fetch(`http://localhost:3000/api/machine/${id}`, {
      method: "DELETE",
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);

    onMachineDeleted();
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
            Are sure to delete {machine.nama_mesin} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(machine.id_mesin)}
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

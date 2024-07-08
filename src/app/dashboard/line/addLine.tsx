"use client";

import { SyntheticEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";

  type AddLineProps = {
    onLineAdded: () => void;
  };
  
  export default function AddLine({ onLineAdded }: AddLineProps) {
    const [idline, setId] = useState("");
    const [namaline, setNamaLine] = useState("");
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
  
    const router = useRouter();
  
    async function handleSubmit(e: SyntheticEvent) {
      e.preventDefault();
  
      setIsMutating(true);
  
      await fetch("http://localhost:3000/api/line", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nama_line: namaline,
          status_line: 'Return',
        }),
      });
  
      setIsMutating(false);
  
      setId("");
      setNamaLine("");
      router.refresh();
      setModal(false);
  
      // Panggil callback untuk memberitahukan bahwa mesin telah ditambahkan
      onLineAdded();
    }
  
    function handleChange() {
      setModal(!modal);
    }

  return (
    <div>
      <button className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl flex items-center space-x-2" onClick={handleChange}>
        <PlusIcon className="w-6 h-6" />
        <span>Add Line</span>
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Line</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Line</label>
              <input
                type="text"
                value={namaline}
                onChange={(e) => setNamaLine(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nama Line"
                required
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Saving...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

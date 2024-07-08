"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Line = {
  id_line: number;
  nama_line: string;
  status_line: string;
};



type UpdateLineProps = {
  line: Line;
  onLineUpdate: () => void;
};

export default function UpdateLine({ line, onLineUpdate }: UpdateLineProps) {
  const [lineid, setId] = useState(line.id_line);
  const [namaline, setNamaLine] = useState(line.nama_line);
  const [statusline, setStatusLine] = useState(line.status_line);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:3000/api/line/${line.id_line}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama_line: namaline,
        status_line: statusline,
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);

    onLineUpdate();

  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleChange}>
        Edit
    </button>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit {line.nama_line}</h3>
          <form onSubmit={handleUpdate}>
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
                  Update
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
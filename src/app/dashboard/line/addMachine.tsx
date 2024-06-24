"use client";

import { SyntheticEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";

interface Line {
  id_line: number;
  nama_line: string;
}

export default function AddMachine() {
  const [idline, setId] = useState("");
  const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchLines();
  }, []);

  const fetchLines = async () => {
    try {
      const response = await fetch("/api/line");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setLines(data.lines);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch("http://localhost:3000/api/machine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_line: idline,
        nama_mesin: name,
      }),
    });

    setIsMutating(false);

    setId("");
    setName("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button
        className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl flex items-center space-x-2"
        onClick={handleChange}
      >
        <PlusIcon className="w-6 h-6" />
        <span>Add Machine</span>
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-black">Add New Machine</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold text-black">Line</label>
              <select
                value={idline}
                onChange={(e) => setId(e.target.value)}
                className="select w-full select-bordered text-black"
                required
              >
                <option value="" disabled>
                  Pilih Line
                </option>
                {lines.map((line) => (
                  <option key={line.id_line} value={line.id_line}>
                    {line.nama_line}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label font-bold text-black">Machine</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input w-full input-bordered text-black"
                placeholder="Nama Mesin"
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

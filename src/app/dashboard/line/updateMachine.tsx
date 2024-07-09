"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Machine = {
  id_mesin: number;
  id_line: number;
  nama_mesin: string;
};

interface Line {
  id_line: number;
  nama_line: string;
};

type UpdateMachineProps = {
  machine: Machine;
  onMachineUpdate: () => void;
};

export default function UpdateMachine({ machine, onMachineUpdate }: UpdateMachineProps) {
  const [idline, setId] = useState(machine.id_line);
  const [namamesin, setName] = useState(machine.nama_mesin);
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

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:3000/api/machine/${machine.id_mesin}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_line: idline,
        nama_mesin: namamesin,
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);

    onMachineUpdate();

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
          <h3 className="font-bold text-lg text-black">Edit {machine.nama_mesin}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold text-black">Line</label>
              <select
                value={idline}
                onChange={(e) => setId(Number(e.target.value))}
                className="select w-full select-bordered text-black"
                required
              >
                <option value="" disabled>Pilih Line</option>
                {lines.map((line) => (
                  <option key={line.id_line} value={line.id_line}>
                    {line.nama_line}
                  </option>
                ))}
              </select>
              {/* <input
                type="text"
                value={idline}
                onChange={(e) => setId(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Product Name"
                required
              /> */}
            </div>
            <div className="form-control">
              <label className="label font-bold text-black">Nama Mesin</label>
              <input
                type="text"
                value={namamesin}
                onChange={(e) => setName(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Price"
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

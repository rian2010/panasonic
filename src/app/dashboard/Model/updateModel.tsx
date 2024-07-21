"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Models = {
  model_id: number;
  model_name: string;
  process_name: string;
  process_id: string;
};

type UpdateModelsProps = {
  models: Models;
  onModelsUpdate: () => void;
};

const processOptions = [
  { name: "WINDING", value: 25 },
  { name: "WELDING", value: 26 },
  { name: "CORE PRE PRESS", value: 27 },
  { name: "CORE PRESS", value: 28 },
  { name: "ASSEMBLY", value: 29 },
  { name: "TAPPING", value: 30 },
];

export default function UpdateModels({ models, onModelsUpdate }: UpdateModelsProps) {
  const [modelname, setModels] = useState(models.model_name);
  const [processid, setProcess] = useState(models.process_id);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    await fetch(`http://localhost:3000/api/models/${models.model_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_name: modelname,
        process_id: processid,
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);

    onModelsUpdate();
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleChange}
      >
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
          <h3 className="font-bold text-lg">Edit {models.model_name}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold text-black">Nama Model</label>
              <input
                type="text"
                value={modelname}
                onChange={(e) => setModels(e.target.value)}
                className="input w-full input-bordered text-black"
                placeholder="Price"
                required
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-black">Nama Process</label>
              <select
                value={processid}
                onChange={(e) => setProcess(e.target.value)}
                className="input w-full input-bordered text-black"
                required
              >
                {processOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
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

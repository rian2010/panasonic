import React, { SyntheticEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/outline";

interface Models {
  model_id: string;
  model_name: string;
  process_id: string;
  process_name: string;
}

type AddPartProps = {
  onPartsAdded: () => void;
};

export default function AddPart({ onPartsAdded }: AddPartProps) {
  const [partname, setPartName] = useState("");
  const [size, setSize] = useState("");
  const [modelid, setModelId] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [models, setModels] = useState<Models[]>([]); // State untuk menyimpan daftar model
  const [searchTerm, setSearchTerm] = useState(""); // State untuk menyimpan teks pencarian
  const [loadingModels, setLoadingModels] = useState(false); // State untuk menandai proses pemuatan data model
  const router = useRouter();

  async function fetchModelsLazy() {
    try {
      setLoadingModels(true); // Menandai sedang memuat data
      const response = await fetch(`http://localhost:3000/api/models`);
      if (!response.ok) {
        throw new Error("Failed to fetch models");
      }
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error("Error fetching models:", error);
    } finally {
      setLoadingModels(false); // Selesai memuat data
    }
  }

  function handleChange() {
    setModal(!modal);
    if (!modal && models.length === 0) {
      fetchModelsLazy(); // Memuat data model saat dropdown dibuka pertama kali
    }
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    try {
      await fetch("http://localhost:3000/api/parts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          part_name: partname,
          size: size,
          model_id: modelid,
        }),
      });

      setIsMutating(false);

      setPartName("");
      setSize("");
      setModelId("");
      router.refresh();
      setModal(false);

      // Call callback to notify that part has been added
      onPartsAdded();
    } catch (error) {
      console.error("Error adding part:", error);
      setIsMutating(false);
      // Handle error state if necessary
    }
  }

  return (
    <div>
      <button
        className="bg-[#59C5F7] hover:bg-green-700 text-black font-bold py-2 px-4 rounded my-4 flex items-center"
        onClick={handleChange}
      >
        <PlusIcon className="w-6 h-6" />
        <span>Add Part</span>
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      {modal && (
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Part</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label font-bold text-black">Model</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="input w-full input-bordered text-black"
                  placeholder="Search Model..."
                />
                <select
                  value={modelid}
                  onChange={(e) => setModelId(e.target.value)}
                  className="input w-full input-bordered mt-2 text-black"
                  required
                >
                  <option value="">Select Model</option>
                  {loadingModels ? (
                    <option>Loading models...</option>
                  ) : (
                    models
                      .filter((model) =>
                        model.model_name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((model) => (
                        <option key={model.model_id} value={model.model_id}>
                          {model.model_name} ({model.process_name})
                        </option>
                      ))
                  )}
                </select>
              </div>
              <div className="form-control">
                <label className="label font-bold text-black">Part</label>
                <input
                  type="text"
                  value={partname}
                  onChange={(e) => setPartName(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Part Name"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label font-bold text-black">Size</label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Size"
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
      )}
    </div>
  );
}

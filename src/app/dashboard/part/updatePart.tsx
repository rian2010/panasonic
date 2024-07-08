import React, { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type PartDetail = {
  part_id: string;
  part_name: string;
  size: string;
  location: string;
  model_id: string;
  model_name: string;
  process_id: string;
  process_name: string;
  status_part: string;
};

interface Models {
  model_id: string;
  model_name: string;
  process_id: string;
  process_name: string;
}

type UpdatePartsProps = {
  partsDetail: PartDetail;
  onPartUpdate: () => void;
};

const statusOptions = [
  { name: "Available", value: "Available" },
  { name: "Unusable", value: "Unusable" },
];

export default function UpdateParts({ partsDetail, onPartUpdate }: UpdatePartsProps) {
  const [modelid, setModelId] = useState(partsDetail.model_id);
  const [modelname, setModelName] = useState(partsDetail.model_name);
  const [partname, setPartName] = useState(partsDetail.part_name);
  const [size, setSize] = useState(partsDetail.size);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [models, setModels] = useState<Models[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingModels, setLoadingModels] = useState(false);
  const [statusParts, setStatus] = useState(partsDetail.status_part);
  const router = useRouter();

  useEffect(() => {
    // Fetch models saat komponen dimuat
    if (modal) {
      fetchModels(); // Memastikan fetchModels dipanggil saat modal terbuka
    }
  }, [modal]);

  async function fetchModels() {
    try {
      setLoadingModels(true); // Menandai sedang memuat data
      const response = await fetch(`http://localhost:3000/api/models`);
      if (!response.ok) {
        throw new Error("Failed to fetch models");
      }
      const data = await response.json();
      setModels(data); // Mengatur state models dengan hasil dari API
    } catch (error) {
      console.error("Error fetching models:", error);
      // Handle error state if necessary
    } finally {
      setLoadingModels(false); // Selesai memuat data
    }
  }

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);

    // Melakukan update ke API dengan data yang diperbarui
    await fetch(`http://localhost:3000/api/parts/${partsDetail.part_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        part_name: partname,
        size: size,
        model_id: modelid,
        status_part: statusParts,
      }),
    });

    setIsMutating(false);

    router.refresh(); // Refresh halaman setelah update berhasil
    setModal(false); // Menutup modal setelah update berhasil

    onPartUpdate(); // Memanggil callback untuk memberitahu bahwa part telah diperbarui
  }

  function handleChange() {
    setModal(!modal); // Toggle modal
    if (!modal && models.length === 0) {
      fetchModels(); // Panggil fetchModels hanya jika models masih kosong dan modal belum terbuka
    }
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
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

      {modal && (
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit {partsDetail.part_name}</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control">
                <label className="label font-bold">Model</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="input w-full input-bordered"
                  placeholder="Search Model..."
                />
                <select
                  value={modelid}
                  onChange={(e) => setModelId(e.target.value)}
                  className="input w-full input-bordered"
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
                <label className="label font-bold">Part Name</label>
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
                <label className="label font-bold">Size</label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Size"
                  required
                />
              </div>
              {statusOptions.some(option => option.value === statusParts) && (
                <div className="form-control">
                  <label className="label font-bold">Status</label>
                  <select
                    value={statusParts}
                    onChange={(e) => setStatus(e.target.value)}
                    className="input w-full input-bordered"
                    required
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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
      )}
    </div>
  );
}

import { PaperClipIcon } from "@heroicons/react/24/outline";
import React, { SyntheticEvent, useEffect, useState } from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  part: {
    model_id: number;
    model_name: string;
    process_name: string;
  } | null;
}

interface Parts {
  part_id: string;
  model_id: string;
  part_name: string;
  size: string;
}

interface Line {
  id_line: number;
  nama_line: string;
}

const DetailsModal: React.FC<ModalProps> = ({ isVisible, onClose, part }) => {
  const [parts, setParts] = useState<Parts[]>([]);
  const [partsAvailable, setPartsAvailable] = useState<Parts[]>([]);
  const [lines, setLines] = useState<Line[]>([]);
  const [form, setForm] = useState({
    id_line: "",
    status_usage: "Ordered",
    part_ids: [] as string[],
  });

  useEffect(() => {
    fetchLines();
  }, []);

  const fetchLines = async () => {
    try {
      const response = await fetch("/api/line/status");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setLines(data.lines);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    if (part) {
      fetchParts(part.model_id);
      fetchPartsAvailable(part.model_id);
    }
  }, [part]);

  const fetchParts = async (modelId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/parts/${modelId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch parts");
      }
      const data = await response.json();
      setParts(data.post);
      setForm((prevForm) => ({
        ...prevForm,
        part_ids: data.post.map((part: Parts) => part.part_id),
      }));
    } catch (error) {
      console.error("Error fetching parts:", error);
    }
  };

  const fetchPartsAvailable = async (modelId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/parts/available/${modelId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch parts");
      }
      const data = await response.json();
      setPartsAvailable(data.post);
    } catch (error) {
      console.error("Error fetching parts:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { id_line, status_usage, part_ids } = form;

    try {
      await Promise.all(
        part_ids.map((part_id) =>
          fetch("http://localhost:3000/api/usage_part", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id_line, status_usage, part_id }),
          })
        )
      );

      setForm({
        id_line: "",
        status_usage: "Ordered",
        part_ids: [],
      });

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!isVisible || !part) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full max-h-screen">
        <div className="flex flex-col h-full">
          <div className="px-4 sm:px-6 py-4 bg-white border-b">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Model Details {part.model_name}</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4" style={{ maxHeight: 'calc(100vh - 180px)' }}>
              <dl className="divide-y divide-gray-100">
                {/* <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-[#3E3B64] text-white border-b">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Part Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Size
                </th>
              </tr>
            </thead>
            <tbody>
              {partsAvailable?.map((part) => (
                <tr key={part.part_id} className="text-white">
                  <td className="px-6 py-4 text-black">{part.part_name}</td>
                  <td className="px-6 py-4 text-black">{part.size}</td>
                </tr>
              ))}
            </tbody>
            </table> */}
                {parts.map((part) => (
                  <div key={part.part_id} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-900">Part Id</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{part.part_id}</dd>
                    <dt className="text-sm font-medium text-gray-900">Part Name</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{part.part_name}</dd>
                    <dt className="text-sm font-medium text-gray-900">Size</dt>
                    <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{part.size}</dd>
                  </div>
                ))}
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-900">Line ID</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                    <select name="id_line" value={form.id_line} onChange={handleChange} className="form-select mt-1 block w-full" required>
                      <option value="">Select Line ID</option>
                      {lines.map((line) => (
                        <option key={line.id_line} value={line.id_line.toString()}>{line.nama_line}</option>
                      ))}
                    </select>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-900">Part IDs</dt>
                  <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                    {form.part_ids.join(', ')}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-3 sm:px-6 bg-gray-50 flex justify-end space-x-2">
              <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-auto sm:text-sm">
                Order
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;

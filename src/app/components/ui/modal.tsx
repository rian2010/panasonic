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
  status_part: string;
  pn: string; // Add the PN property
}

interface Line {
  id_line: number;
  nama_line: string;
}

const DetailsModal: React.FC<ModalProps> = ({ isVisible, onClose, part }) => {
  const [parts, setParts] = useState<Parts[]>([]);
  const [filteredParts, setFilteredParts] = useState<Parts[]>([]);
  const [selectedParts, setSelectedParts] = useState<Parts[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [form, setForm] = useState({
    id_line: "",
    status_usage: "Ordered",
    part_ids: [] as string[],
  });
  const [hasUnusablePart, setHasUnusablePart] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (isVisible) {
      fetchLines();
      fetchAllParts();
    } else {
      resetState();
    }
  }, [isVisible]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredParts([]);
    } else {
      setFilteredParts(
        parts.filter(
          (part) =>
            part.part_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            part.size.toLowerCase().includes(searchQuery.toLowerCase()) ||
            part.status_part.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, parts]);

  const fetchLines = async () => {
    try {
      const response = await fetch("/api/line/status");
      if (!response.ok) {
        throw new Error("Failed to fetch lines");
      }
      const data = await response.json();
      setLines(data.lines);
    } catch (error) {
      console.error("Error fetching lines:", error);
    }
  };

  const fetchAllParts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/parts");
      if (!response.ok) {
        throw new Error("Failed to fetch parts");
      }
      const data = await response.json();
      if (data && Array.isArray(data.posts)) {
        setParts(data.posts);

        // Check if there are unusable parts
        const hasUnusable = data.posts.some((part: Parts) => part.status_part === "Unusable");
        setHasUnusablePart(hasUnusable);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching parts:", error);
    }
  };

  const resetState = () => {
    setSearchQuery("");
    setFilteredParts([]);
    setSelectedParts([]);
    setForm({
      id_line: "",
      status_usage: "Ordered",
      part_ids: [],
    });
    setValidationError(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectPart = (part: Parts) => {
    setSelectedParts((prev) => [...prev, part]);
    setForm((prevForm) => ({
      ...prevForm,
      part_ids: [...prevForm.part_ids, part.part_id],
    }));
    setSearchQuery("");
    setFilteredParts([]);
  };

  const handleRemovePart = (part: Parts) => {
    setSelectedParts((prev) => prev.filter(p => p.part_id !== part.part_id));
    setForm((prevForm) => ({
      ...prevForm,
      part_ids: prevForm.part_ids.filter(id => id !== part.part_id),
    }));
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

    // Check if part.model_id is available and match with selected parts
    const model_id_from_prop = part?.model_id.toString();

    if (!model_id_from_prop) {
      setValidationError("Model ID is missing.");
      return;
    }

    const invalidParts = selectedParts.filter(part => part.model_id !== model_id_from_prop);

    if (invalidParts.length > 0) {
      setValidationError("Some selected parts do not match the model ID.");
      return;
    }

    setValidationError(null); // Clear any previous errors

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

      resetState();
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!isVisible) {
    return null;
  }

  const noParts = parts.length === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full">
        <div className="flex flex-col h-screen max-h-[90vh]">
          <div className="px-4 sm:px-6 py-4 bg-white border-b">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Model Details {part?.model_name}</h3>
            {hasUnusablePart && (
              <p className="text-red-500">Some parts are incomplete</p>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 flex-1 overflow-y-auto">
              <input
                type="text"
                placeholder="Search for a part"
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
                onChange={handleSearch}
                value={searchQuery}
              />
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">Part Id</th>
                      <th scope="col" className="px-6 py-3">Part Name</th>
                      <th scope="col" className="px-6 py-3">PN</th>
                      <th scope="col" className="px-6 py-3">Actual</th>
                      <th scope="col" className="px-6 py-3">Part Status</th>
                      <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchQuery === "" ? (
                      selectedParts.length > 0 ? (
                        selectedParts.map((part, index) => (
                          <tr
                            key={part.part_id}
                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} dark:bg-gray-800`}
                          >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{part.part_id}</td>
                            <td className="px-6 py-4">{part.part_name}</td>
                            <td className="px-6 py-4">{part.size}</td>
                            <td className="px-6 py-4">{part.pn}</td> {/* New column data */}
                            <td className="px-6 py-4">{part.status_part}</td>
                            <td className="px-6 py-4 text-red-600 dark:text-red-500 cursor-pointer" onClick={() => handleRemovePart(part)}>
                              Remove
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No parts selected</td>
                        </tr>
                      )
                    ) : (
                      filteredParts.length > 0 ? (
                        filteredParts.map((part, index) => (
                          <tr
                            key={part.part_id}
                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} dark:bg-gray-800`}
                          >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{part.part_id}</td>
                            <td className="px-6 py-4">{part.part_name}</td>
                            <td className="px-6 py-4">{part.size}</td>
                            <td className="px-6 py-4">{part.pn}</td> {/* New column data */}
                            <td className="px-6 py-4">{part.status_part}</td>
                            <td className="px-6 py-4 text-blue-600 dark:text-blue-500 cursor-pointer" onClick={() => handleSelectPart(part)}>
                              Select
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No parts found</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              {validationError && (
                <p className="text-red-500 mt-2">{validationError}</p>
              )}

              {!noParts && (
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
              )}
            </div>
            <div className="px-4 py-3 sm:px-6 bg-gray-50 flex justify-end space-x-2">
              {!hasUnusablePart && selectedParts.length > 0 && (
                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm">
                  Order
                </button>
              )}
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
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


import React, { FC, ReactNode } from 'react';
import { PaperClipIcon } from '@heroicons/react/20/solid';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: () => void;
  saveButtonLabel?: string;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isVisible, onClose, onSave, saveButtonLabel = "Order Part", children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full max-h-screen">
        <div className="flex flex-col h-full">
          <div className="px-4 sm:px-6 py-4 bg-white border-b">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Model Details</h3>
          </div>
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4" style={{ maxHeight: 'calc(100vh - 180px)' }}>
            <dl className="divide-y divide-gray-100">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Part name</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">Bor</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Size</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">-</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Model</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">-</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Machine</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">-</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Line</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">-</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Start Date</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">12 March 2024</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">End Date</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">15 March 2024</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Location</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">Shelf 1</dd>
              </div>

              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Part Abnormality</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 text-justify">
                  An unusual irregularity has been detected in the piston rings of the engine's fourth cylinder, characterized by a notable deviation in thickness and an uneven wear pattern. This abnormality, identified during routine maintenance checks, raises concerns regarding potential compression issues and engine performance degradation. Swift action is recommended to assess the extent of damage and implement appropriate remedial measures to ensure optimal functioning of the engine .
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Attachments</dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">resume_back_end_developer.png</span>
                          <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                          View
                        </a>
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">coverletter_back_end_developer.png</span>
                          <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                          View
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-900">Line</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 rounded-md">
                  <select className="form-select mt-1 block w-full rounded-md">
                    <option>Machine 1</option>
                    <option>Machine 2</option>
                    <option>Machine 3</option>
                  </select>
                </dd>

              </div>

            </dl>
          </div>
          <div className="px-4 py-3 sm:px-6 bg-gray-50 flex justify-end space-x-2">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
              onClick={onSave}
            >
              {saveButtonLabel}
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;


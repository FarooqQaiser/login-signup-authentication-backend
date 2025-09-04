import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

export default function ClearAllDataModal({
  setShowClearAllDataModal,
  handleClearAll,
}) {
  return (
    <div className="bg-black bg-opacity-20 fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
      <div className="w-1/3 p-4 bg-white rounded-md shadow-lg">
        <div className="flex justify-end">
          <button
            className="p-2 bg-[#0078F8] text-white rounded-xl hover:bg-white hover:text-[#0078F8] border border-[#0078F8]"
            onClick={() => setShowClearAllDataModal(false)}
          >
            <IoMdClose />
          </button>
        </div>
        <div className="">
          <MdDeleteOutline className="m-auto text-3xl" />
          <div className="">
            <p className="text-center">
              Are your sure you want to clear all tasks?
            </p>
            <div className="w-full flex justify-between mt-3">
              <button
                className="px-7 py-2 bg-green-500 text-white rounded-md hover:bg-white hover:text-green-500 border border-green-500"
                onClick={() => setShowClearAllDataModal(false)}
              >
                No
              </button>
              <button
                className="px-7 py-2 bg-red-500 text-white rounded-md hover:bg-white hover:text-red-500 border border-red-500"
                onClick={handleClearAll}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

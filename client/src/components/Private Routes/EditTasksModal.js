import { useEffect, useRef } from "react";
import { IoMdClose, IoMdCreate } from "react-icons/io";

export default function EditTasksModal({
  setShowEditTaskModal,
  handleEditTaskSubmit,
  editedTaskName,
  setEditedTaskName,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="bg-black bg-opacity-20 fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
        <div className="w-1/3 p-4 bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 bg-[#0078F8] text-white rounded-xl hover:bg-white hover:text-[#0078F8] border border-[#0078F8]"
              onClick={() => setShowEditTaskModal(false)}
            >
              <IoMdClose />
            </button>
          </div>
          <form
            className="m-5 grid grid-cols-[3fr_1fr] gap-2"
            onSubmit={handleEditTaskSubmit}
          >
            <div className="flex items-center gap-3 p-2 border rounded-md shadow-sm">
              <IoMdCreate className="text-[#778899]" />
              <input
                required
                ref={inputRef}
                type="text"
                value={editedTaskName}
                placeholder="Edit Task"
                onChange={(e) => setEditedTaskName(e.target.value)}
                className="w-full outline-none"
              />
            </div>
            <button className="px-6 py-2 bg-[#0078F8] text-white rounded-md hover:bg-white hover:text-[#0078F8] border border-[#0078F8]">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

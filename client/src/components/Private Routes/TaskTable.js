import React from "react";

export default function TaskTable({
  loading,
  isError,
  tasks,
  setEditedTaskName,
  setEditIndex,
  setShowEditTaskModal,
  setShowDeleteModal,
  setDeleteTaskIndex,
}) {
  return (
    <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 border border-gray-300 text-left">Sr#</th>
          <th className="px-4 py-2 border border-gray-300 text-left">
            Task Name
          </th>
          <th className="px-4 py-2 border border-gray-300 text-left">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {tasks && tasks.length > 0 ? (
          tasks.map((task, index) => (
            <tr key={task.id || index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300 text-center">
                {index + 1}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                {task.taskName}
              </td>
              <td className="px-4 py-2 border border-gray-300 flex gap-2 justify-center">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => {
                    setEditedTaskName(task.task);
                    setEditIndex(task.taskId);
                    setShowEditTaskModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => {
                    setDeleteTaskIndex(task.taskId);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="text-center py-4 text-gray-500">
              {loading && "Loading..."}
              {isError && <span className="text-red-500">{isError}</span>}
              {!loading && !isError && "No tasks added yet."}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

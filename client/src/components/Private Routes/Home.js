import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../AuthContext";
import useFetchTasks from "../Custom Hooks/useFetchTasks";
import useAddTask from "../Custom Hooks/useAddTask";
import useEditTask from "../Custom Hooks/useEditTask";
import EditTasksModal from "./EditTasksModal";
import AddTaskModal from "./AddTaskModal";
import TaskTable from "./TaskTable";
import DeleteTaskModal from "./DeleteTaskModal";
import ClearAllDataModal from "./ClearAllDataModal";
import useDeleteTask from "../Custom Hooks/useDeleteTask";
import useClearData from "../Custom Hooks/useClearData";
import ErrorBoundary from "../ErrorBoundary";

export default function Home() {
  const { logout } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, isLoading, error } = useFetchTasks(
    `http://localhost:5000/tasks/${user.id}`
  );

  const tasks = useMemo(() => data?.tasks || [], [data?.tasks]);
  const loading = isLoading;
  const isError = error?.message || null;

  const [showAddTask, setShowAddTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [editedTaskName, setEditedTaskName] = useState("");
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteTaskIndex, setDeleteTaskIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearAllDataModal, setShowClearAllDataModal] = useState(false);
  const [isTasksSorted, setIsTasksSorted] = useState(false);

  const { addTask } = useAddTask({
    url: "http://localhost:5000/tasks/addTask",
    userId: user.id,
    taskName,
  });

  const { mutate: editTask } = useEditTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: clearAllData } = useClearData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTask();
    setTaskName("");
    setShowAddTask(false);
  };

  const handleEditTaskSubmit = async (e) => {
    e.preventDefault();
    editTask({
      userId: user.id,
      taskId: editIndex,
      editedTaskName: editedTaskName,
    });
    setEditedTaskName("");
    setEditIndex(null);
    setShowEditTaskModal(false);
  };

  const handleDeleteTask = async () => {
    deleteTask({
      userId: user.id,
      taskId: deleteTaskIndex,
    });
    setShowDeleteModal(false);
  };

  const handleClearAll = async () => {
    clearAllData({ userId: user.id, tasks });
    setShowClearAllDataModal(false);
  };

  const handleLogoutButton = () => {
    logout();
  };

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a.taskName.localeCompare(b.taskName));
  }, [tasks]);

  return (
    <>
      {showAddTask && (
        <AddTaskModal
          setShowAddTask={setShowAddTask}
          handleSubmit={handleSubmit}
          taskName={taskName}
          setTaskName={setTaskName}
        />
      )}

      {showEditTaskModal && (
        <EditTasksModal
          setShowEditTaskModal={setShowEditTaskModal}
          handleEditTaskSubmit={handleEditTaskSubmit}
          editedTaskName={editedTaskName}
          setEditedTaskName={setEditedTaskName}
        />
      )}

      {showDeleteModal && (
        <DeleteTaskModal
          handleDeleteTask={handleDeleteTask}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {showClearAllDataModal && (
        <ClearAllDataModal
          setShowClearAllDataModal={setShowClearAllDataModal}
          handleClearAll={handleClearAll}
        />
      )}

      <div className="w-full mt-20 flex flex-col items-center gap-10">
        <h1 className="text-4xl font-bold text-gray-800">To Do List Project</h1>

        <div className="overflow-x-auto w-3/4 flex flex-col gap-10">
          <div className="w-full flex justify-center gap-4">
            <button
              className="px-7 py-2 bg-[#0078F8] text-white rounded-md hover:bg-white hover:text-[#0078F8] border border-[#0078F8]"
              onClick={() => {
                setTaskName("");
                setEditedTaskName("");
                setShowAddTask(true);
              }}
            >
              Add Task
            </button>

            <button
              className="px-7 py-2 bg-red-500 text-white rounded-md hover:bg-white hover:text-red-500 border border-red-500"
              onClick={() => setShowClearAllDataModal(true)}
            >
              Clear All
            </button>
            <button
              className="px-7 py-2 bg-[#0078F8] text-white rounded-md hover:bg-white hover:text-[#0078F8] border border-[#0078F8]"
              onClick={handleLogoutButton}
            >
              Logout
            </button>
            <button
              className="px-7 py-2 bg-[#12b000] text-white rounded-md hover:bg-white hover:text-[#12b000] border border-[#12b000]"
              onClick={() => setIsTasksSorted(!isTasksSorted)}
            >
              {isTasksSorted ? "Show Tasks Original Order" : "Sort Tasks"}
            </button>
          </div>

          <ErrorBoundary>
            <TaskTable
              loading={loading}
              isError={isError}
              isTasksSorted={isTasksSorted}
              sortedTasks={sortedTasks}
              tasks={tasks}
              setEditedTaskName={setEditedTaskName}
              setEditIndex={setEditIndex}
              setShowEditTaskModal={setShowEditTaskModal}
              handleDeleteTask={handleDeleteTask}
              setShowDeleteModal={setShowDeleteModal}
              setDeleteTaskIndex={setDeleteTaskIndex}
            />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}

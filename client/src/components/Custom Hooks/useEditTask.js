import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useEditTask(url) {
  const queryClient = useQueryClient();

  const mutationEditTask = useMutation({
    mutationFn: async ({ userId, taskId, editedTaskName }) => {
      return fetch(`http://localhost:5000/tasks/editTask/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: taskId,
          editedTaskName: editedTaskName,
        }),
      }).then((response) => response.json);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task Edited Successfully!");
    },
    onError: () => {
      toast.error("Failed to edite task!");
    },
  });

  return mutationEditTask;
}

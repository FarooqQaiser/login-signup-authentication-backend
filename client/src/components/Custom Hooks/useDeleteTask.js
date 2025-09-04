import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useDeleteTask() {
  const queryClient = useQueryClient();

  const mutationDeleteTask = useMutation({
    mutationFn: async ({ userId, taskId }) => {
      return fetch(`http://localhost:5000/tasks/deleteTask/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId: taskId,
        }),
      }).then((response) => response.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.info("Task Deleted Successfully!");
    },
    onError: () => {
      toast.error("Task Deletion Failed!");
    },
  });

  return mutationDeleteTask;
}

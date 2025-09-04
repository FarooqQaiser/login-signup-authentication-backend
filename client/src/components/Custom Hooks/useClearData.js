import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useClearData() {
  const queryClient = useQueryClient();

  const mutationClearAllData = useMutation({
    mutationFn: async ({ userId, tasks }) => {
      return await Promise.all(
        tasks.map((task) => {
          return fetch(`http://localhost:5000/tasks/deleteTask/${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              taskId: task.taskId,
            }),
          });
        })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.info("All tasks cleared!");
    },
    onError: () => {
      toast.error("All tasks can not be cleared!");
    },
  });

  return mutationClearAllData;
}

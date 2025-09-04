import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useAddTask({ url, userId, taskName }) {
  const queryClient = useQueryClient();

  const mutationAddTask = useMutation({
    mutationFn: async (newTask) => {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, taskName: newTask }),
      }).then((response) => response.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task added successfully!");
    },
    onError: () => {
      toast.error("Task failed to upload!");
    },
  });

  const addTask = () => {
    mutationAddTask.mutate(taskName);
  };

  return { addTask };
}

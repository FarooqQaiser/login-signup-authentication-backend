import { useQuery } from "@tanstack/react-query";

export default function useFetchTasks() {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  // console.log("User ID: ", userId);
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/tasks/${userId}`, {
        method: "GET",
      });
      return await response.json();
    },
  });

  return { data, isLoading, error };
}

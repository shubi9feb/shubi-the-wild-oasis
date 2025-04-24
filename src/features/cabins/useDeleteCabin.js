import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabins as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabins() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabins } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success("Cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabins };
}

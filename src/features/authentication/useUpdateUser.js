import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationKey: ["user"],

    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      // queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries(["user"]);
      toast.success("User account successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}

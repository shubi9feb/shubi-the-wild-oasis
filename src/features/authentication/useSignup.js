import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationKey: ["user"],
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Account created successfully. Verify your email address.");
    },
  });
  return { signup, isLoading };
}

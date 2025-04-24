import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => {
      return updateBooking(bookingId, {
        status: "checked-out",
        isPaid: true,
      });
    },
    onSuccess: (data) => {
      toast.success(`booking id #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
      // navigate("/");
    },
    onError: () => toast.error("There was an error while checked out"),
  });
  return { checkout, isCheckingOut };
  //   const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
  //     mutationFn: ({ bookingId }) =>
  //       updateBooking(bookingId, {
  //         status: "checked-in",
  //         isPaid: true,
  //       }),

  //     onSuccess: (data) => {
  //       toast.success(`Booking #${data.id} successfully checked in`);
  //       queryClient.invalidateQueries({ active: true });
  //       navigate("/");
  //     },

  //     onError: () => toast.error("There was an error while checking in"),
  //   });

  //   return { checkin, isCheckingIn };
}

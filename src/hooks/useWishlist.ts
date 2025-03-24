import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} from "../store/pokemartApi";
import { useAppSelector } from "../store";
import { getToastResponse } from "../config/toastResponses";
import { toast } from "react-toastify";

export const useWishlist = () => {
  const { user } = useAppSelector((state) => state.auth) as unknown as {
    user: { _id: string };
  };
  const { data: wishlist, isLoading: isWishlistLoading } = useGetWishlistQuery(
    user?._id,
    {
      skip: !user,
    },
  );
  const [_addItemToWishlist, { isLoading: isAddingToWishlist }] =
    useAddToWishlistMutation();
  const [_removeItemFromWishlist, { isLoading: isRemovingFromWishlist }] =
    useRemoveFromWishlistMutation();
  const [_clearWishlist, { isLoading: isClearingWishlist }] =
    useClearWishlistMutation();

  const isItemInWishlist = (id: string) =>
    wishlist?.some((item) => item._id === id);

  const validateUserAuth = () => {
    if (!user) {
      const { message, options } = getToastResponse("wishlistNotLoggedIn");
      toast.error(message, options);
      return false;
    }
    return true;
  };

  const addItemToWishlist = (id: string) => {
    if (!validateUserAuth()) return;
    void _addItemToWishlist({ userId: user?._id, itemId: id });
  };

  const removeItemFromWishlist = (id: string) => {
    if (!validateUserAuth()) return;
    void _removeItemFromWishlist({ userId: user?._id, itemId: id });
  };

  const clearWishlist = () => {
    if (!validateUserAuth()) return;
    void _clearWishlist(user?._id);
  };

  const toggleItemInWishlist = (id: string) => {
    if (isItemInWishlist(id)) {
      void removeItemFromWishlist(id);
    } else {
      void addItemToWishlist(id);
    }
  };

  return {
    wishlist,
    isWishlistLoading,

    isAddingToWishlist,
    isRemovingFromWishlist,
    isClearingWishlist,
    isUpdatingWishlist:
      isAddingToWishlist || isRemovingFromWishlist || isClearingWishlist,

    addItemToWishlist,
    removeItemFromWishlist,
    clearWishlist,

    isItemInWishlist,
    toggleItemInWishlist,
  };
};

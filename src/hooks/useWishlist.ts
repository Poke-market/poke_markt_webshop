import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
  useClearWishlistMutation,
} from "../store/pokemartApi";
// import { useAppSelector } from "../store";
import { getToastResponse } from "../config/toastResponses";
import { toast } from "react-toastify";
import { Item } from "../types/apiTypes/item";
export const useWishlist = () => {
  //   const { user } = useAppSelector((state) => state.auth) as unknown as {
  //     user: { _id: string };
  //   };
  const user = { _id: "67e0a8652ae66f43bf98acdf" };
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

  const validateWishListUserAuth = () => {
    if (!user) {
      const { message, options } = getToastResponse("wishlistNotLoggedIn");
      toast.error(message, options);
      return false;
    }
    return true;
  };

  const addItemToWishlist = (item: Item) => {
    if (!validateWishListUserAuth()) return;
    void _addItemToWishlist({ userId: user?._id, item });
  };

  const removeItemFromWishlist = (id: string) => {
    if (!validateWishListUserAuth()) return;
    void _removeItemFromWishlist({ userId: user?._id, itemId: id });
  };

  const clearWishlist = () => {
    if (!validateWishListUserAuth()) return;
    void _clearWishlist(user?._id);
  };

  const toggleItemInWishlist = (item: Item) => {
    if (isItemInWishlist(item._id)) {
      void removeItemFromWishlist(item._id);
    } else {
      void addItemToWishlist(item);
    }
  };

  return {
    validateWishListUserAuth,

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

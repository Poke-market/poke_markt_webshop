import { useAppDispatch } from "../store";
import { useRegisterMutation } from "../store/pokemartApi";
import { UserData, RegisterResponse, ErrorResponse } from "../types/auth";
import { setAuth } from "../store/authSlice";

export const useRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const handleRegister = async (userData: UserData) => {
    try {
      const response = (await register(userData).unwrap()) as RegisterResponse;
      dispatch(setAuth({ user: response.user, token: response.token }));
      return { success: true, data: response };
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      return {
        success: false,
        error: errorResponse,
      };
    }
  };

  return { handleRegister, isLoading };
};

import { useAppDispatch } from "../store";
import { useRegisterMutation } from "../store/pokemartApi";
import { UserData, RegisterResponse } from "../types/auth";
import { setAuth } from "../store/authSlice";

export const useRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const handleRegister = async (userData: UserData) => {
    try {
      const response: RegisterResponse = await register(userData).unwrap();
      dispatch(setAuth({ user: response.user, token: response.token }));
      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error, // No cast needed; inferred as FetchBaseQueryError
      };
    }
  };

  return { handleRegister, isLoading };
};

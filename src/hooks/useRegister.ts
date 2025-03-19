import { useAppDispatch } from "../store";
import { useRegisterMutation } from "../store/pokemartApi";
import { UserData, RegisterResponse } from "../types/auth";
import { setAuth } from "../store/authSlice";

export const useRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const handleRegister = async (userData: UserData) => {
    try {
      const response = (await register(userData).unwrap()) as RegisterResponse;
      console.log("Register response:", response);

      dispatch(
        setAuth({
          user: response.user,
          token: response.token,
        }),
      );

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        error: error as Error,
      };
    }
  };

  return { handleRegister, isLoading };
};

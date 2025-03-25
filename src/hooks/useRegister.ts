import { useAppDispatch } from "../store";
import { useRegisterMutation } from "../store/pokemartApi";
import { UserData } from "../types/auth";
import { setAuth, clearAuth } from "../store/authSlice";
export const useRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();

  const handleRegister = async (userData: UserData) => {
    const { data: user, error: registerError } = await register(userData);
    if (registerError) {
      console.log("registerError", registerError);

      dispatch(clearAuth());
      return { success: false, error: registerError };
    } else {
      dispatch(setAuth(user));
      return { success: true, data: user };
    }
    // try {
    //   const response: RegisterResponse = await register(userData).unwrap();
    //   dispatch(setAuth({ user: response.user, token: response.token }));
    //   return { success: true, data: response };
    // } catch (error) {
    //   return {
    //     success: false,
    //     error,
    //   };
    // }
  };

  return { handleRegister, isLoading };
};

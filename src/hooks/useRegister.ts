import { useRegisterMutation } from "../store/pokemartApi.ts";
import { UserData } from "../types/auth.ts";

export const useRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (userData: UserData) => {
    try {
      const response = await register(userData).unwrap();
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  };

  return { handleRegister, isLoading };
};

export default useRegister;

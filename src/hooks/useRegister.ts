import { useRegisterMutation } from "../store/pokemartApi.ts";
import { RegisterFormData } from "../types/apiTypes/auth";

export const useRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (userData: RegisterFormData) => {
    try {
      const response = await register(userData).unwrap();
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error };
    }
  };

  return { handleRegister, isLoading };
};

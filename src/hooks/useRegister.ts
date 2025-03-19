import { useAppDispatch } from "../store";
import { useRegisterMutation } from "../store/pokemartApi.ts";
import { UserData } from "../types/auth.ts";
import { setAuth } from "../store/authSlice";
import { apiResponse } from "../types/apiTypes/response";

type AuthResponseData = {
  user?: UserData;
  token: string;
};

export const useRegister = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const handleRegister = async (userData: UserData) => {
    const response = (await register(
      userData,
    ).unwrap()) as apiResponse<AuthResponseData>;
    if (response.status === "success") {
      const { data } = response;
      const user = data.user ?? userData;
      const { token } = data;
      dispatch(setAuth({ user, token }));
      return { success: true, data };
    }
    return { success: false, error: response };
  };
  return { handleRegister, isLoading };
};
export default useRegister;

import { useAuthUser } from "~/composables/auth/useAuthUser";
import Auth from "~/utils/api/Auth/Auth";
import User from "~/utils/api/Auth/User";
import { computed } from "vue";
import { useCookie } from "#app";

export const useAuth = () => {
  const authUser = useAuthUser();

  const token = useCookie<string | null>("access_token", {
    default: () => null,
    maxAge: 86400
  });

  const isLoggedIn = computed<boolean>(() => authUser.value !== null);

  const setUser = (user: any) => {
    authUser.value = user;
  };

  const setToken = (accessToken: string | null) => {
    token.value = accessToken;
  };

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    const data = await new Auth().login({
      email,
      password,
      rememberMe
    });

    if (!data.user) return data;

    if (data.user) {
      setUser(data.user);
      setToken(data.user.token);
    }

    return authUser;
  };

  const logout = async () => {
    await new Auth().logout();
    clearState();
  };

  const me = async () => {
    if (!isLoggedIn.value) {
      try {
        const response = await new User().me();
        const user = response.user;

        if (!user) {
          clearState();
        } else {
          setUser(user);
        }
      } catch (error) {
        clearState();
      }
    }

    return authUser;
  };

  const clearState = () => {
    setToken(null);
    setUser(null);
  };

  return {
    login,
    logout,
    me,
    isLoggedIn,
    token
  };
};

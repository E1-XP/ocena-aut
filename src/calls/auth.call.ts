import { SignInResponse, signIn, signOut } from "next-auth/react";

export const login = async (
  email: string,
  password: string
): Promise<SignInResponse> => {
  return signIn("credentials", {
    email,
    password,
    redirect: false,
  })
    .then((res) => {
      const response = res as unknown as SignInResponse;
      if (!response.error) {
        return res as unknown as SignInResponse;
      } else {
        throw new Error(response.error);
      }
    })
    .catch((error) => {
      throw error;
    });
};

export const logout = (): void => {
  signOut();
};

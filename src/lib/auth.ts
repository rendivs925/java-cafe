import { COOKIE_NAME } from "@/constanst";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export interface UserJwtPayload {
  jti: string;
  iat: number;
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
}

export const getRajaOngkirApiKey = (): string => {
  const apiKey = process.env.RAJA_ONGKIR_API_KEY;

  if (!apiKey || apiKey.length === 0) {
    throw new Error("The environment variable RAJA_ONGKIR_API_KEY is not set.");
  }

  return apiKey;
};

export const getVerifiedToken = async () => {
  const token = cookies().get(COOKIE_NAME);

  const verifiedToken =
    token &&
    (await verifyAuth(token.value).catch((err) => {
      console.log("Verification error:", err);
      return null;
    }));

  return verifiedToken;
};

export const getJwtSecretKey = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET is not set.");
  }

  return secret;
};

export async function verifyAuth(token: string): Promise<UserJwtPayload> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return payload as unknown as UserJwtPayload;
  } catch (error) {
    throw new Error("Your token has expired or is invalid.");
  }
}

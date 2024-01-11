import * as jose from "jose";
import { JOSEError } from "jose/errors";
import { NextRequest } from "next/server";
import { appResponse, getErrorMessage } from ".";
import { TemplateResponse } from "@/types/api/TemplateResponse";

const jwtKey = process.env.NEXT_PUBLIC_JWT_KEY || "asasas";
const generateToken = async (
  data: any,
  expiresIn: string | number | undefined = 60
): Promise<string> => {
  const token = await new jose.SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(new TextEncoder().encode(jwtKey));

  return token;
};

const verifyToken = async (request: NextRequest): Promise<TemplateResponse> => {
  let res: TemplateResponse = appResponse(true);
  try {
    const token = request.cookies.get("token")!.value;

    const hasil: jose.JWTVerifyResult = await jose.jwtVerify(
      token,
      new TextEncoder().encode(jwtKey)
    );
  } catch (error) {
    console.log(error);
    res = appResponse(false, getErrorMessage(error));
  }
  // request.headers.has();
  return res;
};

export { generateToken, verifyToken };

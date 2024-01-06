import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const generateToken = (
  data: any,
  expiresIn: string | number | undefined = 60
): string => {
  const jwtKey = process.env.NEXT_PUBLIC_JWT_KEY || "asasas";

  const token = jwt.sign(data, jwtKey, {
    expiresIn,
  });

  return token;
};

const compareToken = (token: string) => {};

const verifyToken = (request: NextRequest): boolean => {
  let res = true;
  request.headers.get("Authorization");
  // request.headers.has();
  return res;
};

export { generateToken, compareToken };

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

import { appResponse, generateToken, getErrorMessage } from "@/helpers";
import { authRepository } from "@/repositories";
import { TemplateResponse } from "@/types/api/template_response";

const login = async (
  username: string,
  password: string
): Promise<TemplateResponse> => {
  let res = appResponse(true);
  try {
    const user = await authRepository.getUser(username);
    if (!user) {
      res = appResponse(false, "User not found", { statusCode: 404 });
      return res;
    }

    if (!user.user_status) {
      res = appResponse(false, "User not found", { statusCode: 404 });
      return res;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res = appResponse(false, "Invalid credentials", { statusCode: 401 });
      return res;
    }

    const expiresIn = 60 * 60 * 24;
    const token = generateToken({ userId: user.user_id }, expiresIn);
    const currentTime = new Date();

    cookies().set("token", token);
    cookies().set("tokenType", "Bearer");
    cookies().set(
      "expiresIn",
      new Date(currentTime.getTime() + expiresIn * 1000).toISOString()
    );

    res.data = {
      token,
      expiresIn,
      tokenType: "Bearer",
    };
  } catch (error) {
    if (!(error instanceof Error)) {
      console.log(error);
    } else {
      res = appResponse(false, getErrorMessage(error));
    }
  }
  return res;
};

export default { login };

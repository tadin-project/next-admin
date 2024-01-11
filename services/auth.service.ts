import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

import { appResponse, generateToken, getErrorMessage } from "@/helpers";
import { authRepository } from "@/repositories";
import { TemplateResponse } from "@/types/api/TemplateResponse";

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

    const expiresIn = 60 * 60;
    const token = await generateToken(
      { userId: user.user_id },
      expiresIn / 60 + "m"
    );

    cookies().set("token", token, {
      expires: Date.now() + expiresIn * 1000,
    });

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

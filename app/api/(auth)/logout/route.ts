import {
  appResponse,
  deleteCookiesAuth,
  getErrorMessage,
  serverResponse,
} from "@/helpers";
import { TemplateResponse } from "@/types/api";
import { NextRequest } from "next/server";

const POST = async (req: NextRequest) => {
  let res: TemplateResponse = appResponse(true);
  try {
    deleteCookiesAuth();
    console.log(req.cookies.get("token"));
  } catch (error) {
    res = appResponse(false, getErrorMessage(error));
  }
  return serverResponse(res);
};

export { POST };

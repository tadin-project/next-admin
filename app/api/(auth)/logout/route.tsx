import { appResponse, getErrorMessage } from "@/helpers";
import { TemplateResponse } from "@/types/api/template_response";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  let res: TemplateResponse = appResponse(true);
  try {
    // cookies().set("tes", "tes", { expires: Date.now() + 60 * 1000 });

    console.log(cookies().get("tes"));
    console.log(new URL(req.url));

    return NextResponse.json(res);
    console.log(req.cookies);
    if (!req.cookies.has("token")) {
      res = appResponse(false, "Token invalid");
      return NextResponse.json(res);
    }
    return NextResponse.json(res);
  } catch (error) {
    if (!(error instanceof Error)) {
      console.log(error);
    } else {
      res = appResponse(false, getErrorMessage(error));
    }
  }
  return NextResponse.json(res);
};

export { GET };

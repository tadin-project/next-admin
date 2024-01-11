import { TemplateResponse } from "@/types/api/TemplateResponse";
import { NextResponse } from "next/server";

const serverResponse = (res: TemplateResponse) => {
  let statusCode = 200;
  if (res.error) {
    statusCode = 500;
    if (res.statusCode) {
      statusCode = res.statusCode;
    }
    return NextResponse.json(res, { status: statusCode });
  } else {
    if (res.statusCode) {
      statusCode = res.statusCode;
    }
    return NextResponse.json(res, { status: statusCode });
  }
};

export default serverResponse;

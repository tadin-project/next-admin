// import { TemplateResponse } from "@/types/api/template_response";
import { authService } from "@/services";
import { TemplateResponse } from "@/types/api/template_response";

const POST = async (req: Request) => {
  const { username, password } = await req.json();
  const res: TemplateResponse = await authService.login(username, password);
  let statusCode = 200;
  if (res.error) {
    statusCode = 500;
    if (res.statusCode) {
      statusCode = res.statusCode;
    }
    return Response.json(res, { status: statusCode });
  } else {
    if (res.statusCode) {
      statusCode = res.statusCode;
    }
    return Response.json(res, { status: statusCode });
  }
};

export { POST };

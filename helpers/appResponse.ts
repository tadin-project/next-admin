import { TemplateResponse } from "@/types/api/TemplateResponse";

const appResponse = (
  status: boolean,
  message: string = "",
  {
    statusCode,
  }: {
    statusCode?: number;
  } = {}
): TemplateResponse => {
  let res: TemplateResponse = {};
  if (statusCode) {
    res.statusCode = statusCode;
  }

  if (!status) {
    if (message) {
      res.error = message;
    } else {
      res.error = "Error";
    }
  } else {
    res.error = null;
    if (message) {
      res.message = message;
    }
  }

  return res;
};

export default appResponse;

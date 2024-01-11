import { serverResponse } from "@/helpers";
import { userServices } from "@/services";
import { NextRequest } from "next/server";

const POST = async (request: NextRequest) => {
  const { username, password, user_status } = await request.json();
  const data = { username, password, user_status: user_status == "true" };
  const res = await userServices.add(data);
  return serverResponse(res);
};

export { POST };

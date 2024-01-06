import { NextRequest } from "next/server";

const deleteCookiesAuth = (request: NextRequest) => {
  request.cookies.delete("expiresIn");
  request.cookies.delete("token");
  request.cookies.delete("tokenType");
};

export default deleteCookiesAuth;

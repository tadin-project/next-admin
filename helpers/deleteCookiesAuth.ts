import { cookies } from "next/headers";

const deleteCookiesAuth = () => {
  cookies().delete("token");
};

export default deleteCookiesAuth;

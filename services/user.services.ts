import bcrypt from "bcryptjs";

import db from "@/config/db";
import { appResponse, getErrorMessage } from "@/helpers";

const getAllUser = async () => {
  const users = await db.msUser.findMany();
  return users;
};

const add = async (data: any) => {
  let res = appResponse(true);
  try {
    const salt: string = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const user = await db.msUser.create({
      data,
      select: {
        user_id: true,
        username: true,
        password: false,
        user_status: true,
        pegawai_id: true,
      },
    });
    res.data = user;
  } catch (error) {
    console.log(error);
    res = appResponse(false, getErrorMessage(error), {
      statusCode: 400,
    });
  }
  return res;
};

export default { add, getAllUser };

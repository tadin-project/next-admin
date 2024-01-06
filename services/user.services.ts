import db from "@/config/db";

const getAllUser = async () => {
  const users = await db.msUser.findMany();
  return users;
};

export default { getAllUser };

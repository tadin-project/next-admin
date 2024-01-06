import db from "@/config/db";

const getUser = async (username: string) => {
  try {
    const data = await db.msUser.findFirst({
      where: {
        username: username,
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};

export default { getUser };

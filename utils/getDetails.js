import jwt from "jsonwebtoken";
export const getDetails = async (request) => {
  try {
    const token = request.headers.get("token") || "";
    const decoded = jwt.verify(token, process.env.MONGO_SECRET);
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};

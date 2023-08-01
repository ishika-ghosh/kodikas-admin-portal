import jwt from "jsonwebtoken";
export const getDetails = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decoded = jwt.verify(token, process.env.MONGO_SECRET);
    return decoded?.id;
  } catch (error) {
    console.log(error);
  }
};

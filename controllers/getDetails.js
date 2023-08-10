import jwt from "jsonwebtoken";
export const getDetails = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decoded = jwt.verify(token, process.env.MONGO_SECRET, (err, res) => {
      if (err) {
        return null;
      }
      return res;
    });
    return decoded;
  } catch (error) {
    console.log(error);
  }
};

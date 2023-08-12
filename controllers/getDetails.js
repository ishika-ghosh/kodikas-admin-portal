import verify from "jsonwebtoken/verify";
export const getDetails = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    console.log(token);
    const decoded = verify(token, process.env.MONGO_SECRET, (err, res) => {
      if (err) {
        console.log(err);
        return null;
      }
      return res;
    });
    return decoded;
  } catch (error) {
    console.log(error);
  }
};

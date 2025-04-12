import * as jwt from "jsonwebtoken";
import dotevn from "dotenv";

dotevn.config({ path: "../../.env" });

const secret: jwt.Secret =
  typeof process.env.JWT_SECRET_KEY === "string"
    ? process.env.JWT_SECRET_KEY
    : "secret";

const signToken = (payload: object) =>
  jwt.sign(payload, secret, { expiresIn: "10m" });

const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occured: ", error);
    }
  }
};

export { signToken, decodeToken };

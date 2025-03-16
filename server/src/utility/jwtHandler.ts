import * as jwt from "jsonwebtoken";
import dotevn from "dotenv";

dotevn.config({ path: "../../.env" });

const secret: jwt.Secret =
  typeof process.env.JWT_SECRET_KEY === "string"
    ? process.env.JWT_SECRET_KEY
    : "secret";

const signToken = (payload: object) =>
  jwt.sign(payload, secret, { expiresIn: "10m" });

const decodeToken = (token: string) => jwt.verify(token, secret);

export { signToken, decodeToken };

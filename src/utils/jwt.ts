import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}

export const signToken = (
  payload: string | object | Buffer,
  expiresIn: string = "7d"
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string): string | JwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

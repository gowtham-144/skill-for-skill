import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "default_secret";

// Payload can be object, string, or Buffer
type Payload = string | Buffer | object;

export const signToken = (
  payload: Payload,
  expiresIn: string | number = "7d"
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string): JwtPayload | string | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload | string;
  } catch {
    return null;
  }
};

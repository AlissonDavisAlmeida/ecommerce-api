import { JwtPayload } from "src/auth/dtos/login.dto";

export const authorizationToLoginPayload = (authorization: string): JwtPayload => {
  const authorizationSplited = authorization.split(" ")[1].split(".");

  if (authorizationSplited.length < 3 || !authorizationSplited[1]) {
    return undefined;
  }

  return JSON.parse(Buffer.from(authorizationSplited[1], "base64").toString("utf-8"));
};
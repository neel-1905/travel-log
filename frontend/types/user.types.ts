export type ROLE = "ADMIN" | "USER";

export type USER = {
  email: string;
  password: string;
  username: string;
  profileImg?: string;
  role: ROLE;
  description?: string;
};

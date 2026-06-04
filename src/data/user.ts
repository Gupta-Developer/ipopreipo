export interface User {
  id: string;
  email: string;
  name: string;
  role: "PRO" | "USER";
  createdAt: string;
}

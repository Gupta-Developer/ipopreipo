export interface User {
  id: string;
  email: string;
  name: string;
  role: "PRO" | "USER" | "ADMIN" | "AUTHOR";
  createdAt: string;
  assignedCountries?: string[];
}

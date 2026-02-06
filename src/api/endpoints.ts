export const API_ENDPOINTS = {
  USERS: "/users",
  LOGIN: "/auth/login",
  APPOINTMENTS: "/appointments",
  APPOINTMENT_BY_ID: (id: string) => `/appointments/${id}`,
};
  
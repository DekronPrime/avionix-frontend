import { api } from "./axios";

export const countriesApi = {
  getAll: () => api.get("/countries"),
  getById: (id: number) => api.get(`/countries/${id}`),
};

import { api } from "./axios";

export const airportsApi = {
  getAll: () => api.get("/airports"),

  getById: (id: string) => api.get(`/airports/${id}`),

  create: (data: any) => api.post("/airports", data),

  update: (id: string, data: any) => api.patch(`/airports/${id}`, data),

  updateStatus: (id: string, status: any) =>
    api.patch(`/airports/${id}/status`, status),

  delete: (id: string) => api.delete(`/airports/${id}`),
};

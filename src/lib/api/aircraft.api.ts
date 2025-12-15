import { api } from "./axios";

export const aircraftApi = {
  getAll: () => api.get("/aircraft"),

  getById: (id: string) => api.get(`/aircraft/${id}`),

  create: (data: any) => api.post("/aircraft", data),

  update: (id: string, data: any) => api.patch(`/aircraft/${id}`, data),

  updateStatus: (id: string, status: any) =>
    api.patch(`/aircraft/${id}/status`, status),

  delete: (id: string) => api.delete(`/aircraft/${id}`),
};

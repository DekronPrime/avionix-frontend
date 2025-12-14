import { api } from "./axios";

export const airlinesApi = {
  getAll: () => api.get("/airlines"),

  getById: (id: string) => api.get(`/airlines/${id}`),

  create: (data: any) => api.post("/airlines", data),

  update: (id: string, data: any) => api.patch(`/airlines/${id}`, data),

  updateStatus: (id: string, status: any) =>
    api.patch(`/airlines/${id}/status`, status),

  delete: (id: string) => api.delete(`/airlines/${id}`),
};

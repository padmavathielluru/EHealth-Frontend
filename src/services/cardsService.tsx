import { api } from "../api";
import { API_ENDPOINTS } from "../api/endpoints";
import {cardsInterface} from '../interfaces';


export const cardsService = {
  getAll: () => api.get<cardsInterface[]|null>(API_ENDPOINTS.USERS),
  getById: (id: number) => api.get<cardsInterface>(`${API_ENDPOINTS.USERS}/${id}`),
  create: (user: Partial<cardsInterface>) => api.post<cardsInterface>(API_ENDPOINTS.USERS, user),
};

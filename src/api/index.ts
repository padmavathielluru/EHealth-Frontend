import apiClient from "./apiClient";

export const api = {
  get: async <T>(url: string, params?: object): Promise<T|null> => {
    try{
    const { data } = await apiClient.get<T>(url, { params });
    return data;
    }catch(err){
      console.error(err)
       return null;
    }
  },

  post: async <T>(url: string, body?: object): Promise<T|null> => {
    try{
    const { data } = await apiClient.post<T>(url, body);
    return data;
     }catch(err){
      console.error(err)
       return null;
    }
  },

  put: async <T>(url: string, body?: object): Promise<T|null> => {
    try{
    const { data } = await apiClient.put<T>(url, body);
    return data;
     }catch(err){
      console.error(err)
       return null;
    }
  },

  delete: async <T>(url: string): Promise<T|null> => {
    try{
    const { data } = await apiClient.delete<T>(url);
    return data;
     }catch(err){
      console.error(err)
       return null;
    }
  },
};

import axiosInstance from '@/lib/axios';

export const apiService = {
  // GET request example
  async getData() {
    const response = await axiosInstance.get('/your-endpoint');
    return response.data;
  },

  // POST request example
  async createData(data: any) {
    const response = await axiosInstance.post('/your-endpoint', data);
    return response.data;
  },

  // PUT request example
  async updateData(id: string, data: any) {
    const response = await axiosInstance.put(`/your-endpoint/${id}`, data);
    return response.data;
  },

  // DELETE request example
  async deleteData(id: string) {
    const response = await axiosInstance.delete(`/your-endpoint/${id}`);
    return response.data;
  }
}; 
import axios from "axios";
import config from "../config/api.config";

export default {

   


  async loadClients() {
    
      const res =  axios.get(config.urlAdminClients);
      return (await res).data;
    
  },
  async loadClientInfo(clientId: string) {
    
      const res = await axios.get(config.urlAdminClients + clientId, {});
      return res.data;
    
  },
  async addClient(model: FormData) {
    
      const res =  axios.post(config.urlAdminClients, model, {   
      });
      return (await res).data;
    
  },
  async updateClient(model: FormData) {
    
    const res =  axios.put(config.urlAdminClients, model, {        
    });
    return (await res).data;
     
       
    
  },
  async deleteClient(clientId: string) {
    
    const res =  axios.delete(config.urlAdminClients + clientId, {
    });
    return (await res).data;

       
    
  },
};

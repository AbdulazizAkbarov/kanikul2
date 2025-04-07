import axios from "axios";

const api = axios.create({
  baseURL: "https://nt.softly.uz",
});
api.interceptors.response.use(null, (e) => {
  if (e.status === 401) {
   import("./Store/Mystore").then((res)=>{
    const useAuthStore = res.default
    const state =useAuthStore.getState()
    state.logaute()
   })
  }
});
export default api;

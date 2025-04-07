import { create } from "zustand";
import api from "../Axios";
type GlobalType={
  accessToken:string,
  user: any,
  logaute: () =>void,
}

const useMyStor = create<GlobalType>((set) => {
  const ls_strin = localStorage.getItem("auth");

 
  if (!ls_strin) {
    return {
      accessToken: "",
      user: null,
      logaute: () => {},
    };
  }
  const ls = JSON.parse(ls_strin);

  api.defaults.headers.Authorization = `Bearer ${ls.accessToken}`;

  return {
    accessToken: ls.accessToken,
    user: ls.user,
    logaute: () => {
      localStorage.removeItem("auth");
      set({
        user: null,
        accessToken: "",
      });
    },
  };
});
export default useMyStor;

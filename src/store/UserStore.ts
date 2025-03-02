import { create } from "zustand";
import { TsigninSchema, TsignupSchema, TuserStore } from "../types/Types";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";

const token = Cookies.get("user");
const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
});
export const userStore = create<TuserStore>()((set) => ({
  user: null,
  token,
  signup_user: async (userData: TsignupSchema) => {
    try {
      const { data } = await axiosSecure.post("/auth/register", userData);
      console.log("response sign sdfkjsa", data);
      if (data.success) {
        toast.success(data.message);
      }
      if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Problem during Signup", error);
    }
  },
  loginUser: async (userData: TsigninSchema) => {
    try {
      const { data } = await axiosSecure.post("/auth/login", userData);
      if (data.success) {
        toast.success(data.message);
      }
      if (data.error) {
        toast.error(data.message);
      }
      return Cookies.set("user", data.data.accessToken);
    } catch (error) {
      console.log("Problem during login", error);
    }
  },
  setUser: async (newUser: object) => {
    set({ user: newUser });
  },
  logOutUser: () => {
    Cookies.remove("user");
    set({ user: null });
  },
}));

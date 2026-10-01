import { create } from "zustand";


export const useAppStore = create<{email:string}>()((set) => ({
    email: "Admin@gmail.com",
}))
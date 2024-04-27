import { User } from "@/utils/interfaces/user";
import { create } from "zustand";

interface AuthState {
  user?: User;
}

export const useAuth = create<AuthState>((set) => ({
  user: undefined,
  setUser: (user: User) => set({ user }),
  logout: () => set({ user: undefined }),
}));

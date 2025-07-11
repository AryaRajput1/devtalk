import { axiosWrapper } from "@/utils/axiosWrapper";
import { create } from "zustand";

interface AuthState {
    isAdmin: boolean
    isLoading: boolean
    error: string | null
    checkAdminStatus: () => Promise<void>
    resetStore: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    isAdmin: false,
    isLoading: false,
    error: null,
    checkAdminStatus: async () => {
        set({ error: null, isAdmin: false, isLoading: true });
        try {

            const respose = await axiosWrapper.get("/admin/checkAdminStatus");

            set({
                isAdmin: respose.data.isAdmin,
                isLoading: false,
                error: null
            })
        } catch (error) {
            set({
                isAdmin: false,
                isLoading: false,
                error: error instanceof Error ? error.message : "An unexpected error occurred"
            });
        }
    },
    resetStore: () => {
        set({ isAdmin: false, error: null, isLoading: false });
    },
}));
import type { User } from "@/types";
import { axiosWrapper } from "@/utils/axiosWrapper";
import { create } from "zustand";


interface ChatStore {
    users: User[]
    isLoading: boolean
    error: string | null
    fetchUsers: () => Promise<void>
}

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,
    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosWrapper.get("/users");

            set({ users: response.data.users, isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: "Failed to fetch users" });
            console.error("Error fetching users:", error);
        }
    }
}))
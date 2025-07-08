import type { Playlist, Podcast } from '@/types';
import { axiosWrapper } from '@/utils/axiosWrapper';
import type { AxiosError } from 'axios';
import { create } from 'zustand';

type MusicStore = {
    playlists: Playlist[];
    podcasts: Podcast[];
    isLoading: boolean;
    error: string | null;
    currentPlaylist: Playlist | null;
    getAllPlaylists: () => Promise<void>;
    fetchPlaylistById: (id: string) => Promise<Playlist | null>;
}

export const useMusicStore = create<MusicStore>((set) => {
    return {
        playlists: [],
        podcasts: [],
        isLoading: false,
        error: null,
        currentPlaylist: null,
        getAllPlaylists: async () => {
            set({ playlists: [], isLoading: true, error: null });
            try {

                const response = await axiosWrapper.get('/playlists');
                set({ playlists: response.data.playlists, isLoading: false });

            } catch (error: unknown) {
                set({ isLoading: false, error: (error as AxiosError).message });
            }
        },
        fetchPlaylistById: async (id: string) => {
            set({ isLoading: true, error: null, currentPlaylist: null });
            try {
                const response = await axiosWrapper.get(`/playlists/${id}`);
                set({ isLoading: false, currentPlaylist: response.data.playlist });
            } catch (error: unknown) {
                set({ isLoading: false, error: (error as AxiosError).message, currentPlaylist: null });
                return null;
            }
        },
    }
})
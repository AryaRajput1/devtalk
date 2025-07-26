import type { Playlist, Podcast, Stats } from '@/types';
import { axiosWrapper } from '@/utils/axiosWrapper';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { create } from 'zustand';

type PocastState = {
    playlists: Playlist[];
    podcasts: Podcast[];
    stats?: Stats;
    isLoading: boolean;
    error: string | null;
    currentPlaylist: Playlist | null;
    currentPodcast: Podcast | null;
    featuredPodcasts: Podcast[];
    madeForYouPodcasts: Podcast[];
    trendingPodcast: Podcast[];
    fetchPlaylists: () => Promise<void>;
    fetchPodcasts: () => Promise<void>;
    fetchStats: () => Promise<void>;
    getAllPlaylists: () => Promise<void>;
    fetchPlaylistById: (id: string) => Promise<void>;
    fetchPodcastById: (id: string) => Promise<void>;
    fetchFeaturedPodcasts: () => Promise<void>;
    fetchMadeForYouPodcasts: () => Promise<void>;
    fetchTrendingPodcasts: () => Promise<void>;
    deletePodcast: (id: string) => Promise<void>;
    deletePlaylist: (id: string) => Promise<void>;
}

export const usePodcastStore = create<PocastState>((set, get) => {
    return {
        playlists: [],
        podcasts: [],
        isLoading: false,
        error: null,
        currentPlaylist: null,
        currentPodcast: null,
        featuredPodcasts: [],
        madeForYouPodcasts: [],
        trendingPodcast: [],
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
            }
        },
        fetchPodcastById: async (id: string) => {
            set({ isLoading: true, error: null, currentPodcast: null });
            try {
                const response = await axiosWrapper.get(`/podcasts/${id}`);
                set({ isLoading: false, currentPodcast: response.data.podcast });
            } catch (error: unknown) {
                set({ isLoading: false, error: (error as AxiosError).message, currentPodcast: null });
            }
        },
        fetchFeaturedPodcasts: async () => {
            set({ featuredPodcasts: [], isLoading: true, error: null });
            try {
                const response = await axiosWrapper.get('/podcasts/featured');
                set({ featuredPodcasts: response.data.podcasts, isLoading: false });
            } catch (error: unknown) {
                set({ isLoading: false, error: (error as AxiosError).message });
            }
        },
        fetchMadeForYouPodcasts: async () => {
            set({ madeForYouPodcasts: [], isLoading: true, error: null });
            try {
                const response = await axiosWrapper.get('/podcasts/made-for-you');
                set({ madeForYouPodcasts: response.data.podcasts, isLoading: false });
            } catch (error: unknown) {
                set({ isLoading: false, error: (error as AxiosError).message });
            }
        },
        fetchTrendingPodcasts: async () => {
            set({ trendingPodcast: [], isLoading: true, error: null });
            try {
                const response = await axiosWrapper.get('/podcasts/trending');
                set({ trendingPodcast: response.data.podcasts, isLoading: false });
            } catch (error: unknown) {
                set({ isLoading: false, error: (error as AxiosError).message });
            }
        },
        fetchPlaylists: async () => {
            set({ playlists: [], isLoading: true, error: null });
            try {
                const response = await axiosWrapper.get('/playlists');
                set({ playlists: response.data.playlists, isLoading: false });
            } catch (error: unknown) {
                set({ isLoading: false, error: (error as AxiosError).message });
            }
        },
        fetchPodcasts: async () => {
            set({ podcasts: [], isLoading: true, error: null });
            try {
                const response = await axiosWrapper.get('/podcasts');
                set({ podcasts: response.data.podcasts, isLoading: false });
            } catch (error: unknown) {
                set({ isLoading: false, error: (error as AxiosError).message });
            }
        },
        fetchStats: async () => {
            set({ isLoading: true, error: null });
            try {
                const response = await axiosWrapper.get("/stats");
                set({ stats: response.data.stats, isLoading: false });
            } catch (error: unknown) {
                set({ isLoading: false, error: (error as AxiosError).message });
            }
        },
        deletePodcast: async (id: string) => {
            set({ isLoading: true, error: null });
            try {
                await axiosWrapper.delete(`/admin/podcast/${id}`);
                const { fetchStats } = get();
                await fetchStats();
                set((state) => ({
                    podcasts: state.podcasts.filter((podcast) => podcast._id !== id),
                    isLoading: false,
                }));
                toast.success("Podcast deleted successfully.");

            } catch (error: unknown) {
                set({ isLoading: false, error: (error as AxiosError).message });
            }
        },
        deletePlaylist: async (id: string) => {
            set({ isLoading: true, error: null });
            try {
                await axiosWrapper.delete(`/admin/playlist/${id}`);
                const { fetchStats } = get();
                await fetchStats();
                set((state) => ({
                    playlists: state.playlists.filter((playlist) => playlist._id !== id),
                    podcasts: state.podcasts.filter((podcast) => podcast.playlist !== id),
                    isLoading: false,
                }));
                toast.success("Playlist deleted successfully.");
            } catch (error: unknown) {
                set({ isLoading: false, error: (error as AxiosError).message });
            }
        },
    }
})
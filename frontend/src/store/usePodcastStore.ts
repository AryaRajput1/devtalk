import type { Playlist, Podcast } from '@/types';
import { axiosWrapper } from '@/utils/axiosWrapper';
import type { AxiosError } from 'axios';
import { create } from 'zustand';

type PocastState = {
    playlists: Playlist[];
    podcasts: Podcast[];
    isLoading: boolean;
    error: string | null;
    currentPlaylist: Playlist | null;
    currentPodcast: Podcast | null;
    featuredPodcast: Podcast[];
    madeForYouPodcasts: Podcast[];
    trendingPodcast: Podcast[];
    getAllPlaylists: () => Promise<void>;
    fetchPlaylistById: (id: string) => Promise<Playlist | null>;
    fetchPodcastById: (id: string) => Promise<Podcast | null>;
    fetchFeaturedPodcasts: () => Promise<void>;
	fetchMadeForYouPodcasts: () => Promise<void>;
	fetchTrendingPodcasts: () => Promise<void>;
}

export const usePodcastStore = create<PocastState>((set) => {
    return {
        playlists: [],
        podcasts: [],
        isLoading: false,
        error: null,
        currentPlaylist: null,
        currentPodcast: null,
        featuredPodcast: [],
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
                return null;
            }
        },
        fetchPodcastById: async (id: string) => {
            set({ isLoading: true, error: null, currentPodcast: null });
            try {
                const response = await axiosWrapper.get(`/podcasts/${id}`);
                set({ isLoading: false, currentPodcast: response.data.podcast });
            } catch (error: unknown) {
                set({ isLoading: false, error: (error as AxiosError).message, currentPodcast: null });
                return null;
            }
        },
        fetchFeaturedPodcasts: async () => {
            set({ featuredPodcast: [], isLoading: true, error: null });
            try {
                const response = await axiosWrapper.get('/podcasts/featured');
                set({ featuredPodcast: response.data.podcasts, isLoading: false });
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
        }
    }
})
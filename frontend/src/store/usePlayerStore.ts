import type { Podcast } from '@/types';
import { create } from 'zustand';

interface PlayerState {
    currentPodcast: Podcast | null;
    currentIndex: number;
    queue: Podcast[];
    isPlaying: boolean;
    initializeQueue: (podcasts: Podcast[]) => void;
    playPlaylist: (podcasts: Podcast[], index?: number) => void;
    setCurrentPodcast: (podcast: Podcast | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
    currentPodcast: null,
    currentIndex: -1,
    queue: [],
    isPlaying: false,
    initializeQueue: (podcasts) => {
        set({
            queue: podcasts,
            currentPodcast: get().currentPodcast || podcasts[0] || null,
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        })
    },
    playPlaylist: (podcasts, index = 0) => {
        if (podcasts.length === 0) {
            return;
        }
        set({
            queue: podcasts,
            currentPodcast: podcasts[index] || null,
            currentIndex: index,
            isPlaying: true,
        });
    },
    setCurrentPodcast: (podcast) => {
        if (!podcast) {
            set({
                currentPodcast: null,
                isPlaying: false,
            });
            return;
        }
        const currentIndex = get().queue.findIndex((p) => p._id === podcast._id);
        set({
            currentPodcast: podcast,
            currentIndex: currentIndex !== -1 ? currentIndex : 0,
            isPlaying: true,
        });
    },
    togglePlay: () => set({ isPlaying: !get().isPlaying }),
    playNext: () => { 
        const { queue, currentIndex } = get();
        if (queue.length === 0) return;
        const nextIndex = (currentIndex + 1) % queue.length;
        set({
            currentPodcast: queue[nextIndex],
            currentIndex: nextIndex,
            isPlaying: true,
        });
    },
    playPrevious: () => {
        const { queue, currentIndex } = get();
        if (queue.length === 0) return;
        const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
        set({
            currentPodcast: queue[prevIndex],
            currentIndex: prevIndex,
            isPlaying: true,
        });
     },
}));
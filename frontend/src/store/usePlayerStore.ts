import type { Podcast } from '@/types';
import { create } from 'zustand';
import { useChatStore } from './useChatStore';
import type { Socket } from 'socket.io-client';

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
        const socket = useChatStore.getState().socket as Socket & { auth: { userId: string } }

        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: `listening ${podcasts[index].title} by ${podcasts[index].artist}`,
            })
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
    togglePlay: () => {
        const willPlaying = !get().isPlaying;

        const currentPodcast = get().currentPodcast;
        const socket = useChatStore.getState().socket as Socket & { auth: { userId: string } }

        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: willPlaying && currentPodcast ? `listening ${currentPodcast.title} by ${currentPodcast.artist}` : "Idle",
            });
        }

        set({ isPlaying: !get().isPlaying })
    },
    playNext: () => {
        const { queue, currentIndex } = get();
        if (queue.length === 0) return;
        const nextIndex = (currentIndex + 1) % queue.length;

        const socket = useChatStore.getState().socket as Socket & { auth: { userId: string } }

        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: `listening ${queue[nextIndex].title} by ${queue[nextIndex].artist}`,
            });
        }

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

        const socket = useChatStore.getState().socket as Socket & { auth: { userId: string } }

        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: `listening ${queue[prevIndex].title} by ${queue[prevIndex].artist}`,
            });
        }

        set({
            currentPodcast: queue[prevIndex],
            currentIndex: prevIndex,
            isPlaying: true,
        });
    },
}));
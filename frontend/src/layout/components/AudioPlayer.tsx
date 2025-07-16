import { usePlayerStore } from '@/store/usePlayerStore';
import React, { useEffect, useRef } from 'react'

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevPodcastRef = useRef<string | null>(null);

    const { currentPodcast, isPlaying, playNext } = usePlayerStore();

    // handle play/pause logic
    useEffect(() => {
        if (isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    }, [isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;

        const handleEnded = () => {
            playNext();
        };

        audio?.addEventListener("ended", handleEnded);

        return () => audio?.removeEventListener("ended", handleEnded);
    }, [playNext]);

    useEffect(() => {
        if (!audioRef.current || !currentPodcast) return;

        const audio = audioRef.current;

        // check if this is actually a new song
        const isPodcastChange = prevPodcastRef.current !== currentPodcast?.audioUrl;
        if (isPodcastChange) {
            audio.src = currentPodcast?.audioUrl;
            // reset the playback position
            audio.currentTime = 0;

            prevPodcastRef.current = currentPodcast?.audioUrl;

            if (isPlaying) audio.play();
        }
    }, [currentPodcast, isPlaying]);
    return (<audio ref={audioRef} />)
}

export default AudioPlayer

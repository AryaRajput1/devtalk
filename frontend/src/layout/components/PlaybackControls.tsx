import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePlayerStore } from '@/store/usePlayerStore';
import { formatDuration } from '@/utils/formatDuration';
import { AudioLines, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1, VolumeOff } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

const PlaybackControls = () => {
    const { currentPodcast, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();

    const [volume, setVolume] = useState(75);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const isMute = volume === 0;

    useEffect(() => {
        audioRef.current = document.querySelector("audio");

        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);

        const handleEnded = () => {
            usePlayerStore.setState({ isPlaying: false });
        };

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [currentPodcast]);

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
        }
    };

    const handleVolume = (value) => {
        setVolume(value[0]);
        if (audioRef.current) {
            audioRef.current.volume = value[0] / 100;
        }
    }

    // handle stop music if spacebar is pressed
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault();

                if (!currentPodcast) return;
                togglePlay();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    })

    if (!currentPodcast) {
        return (
            <footer className='h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4 flex items-center justify-center'>
                <div className='flex items-center gap-2 text-zinc-500'>
                    <AudioLines className='size-6 sm:size-8' />
                    <span className='text-sm sm:text-base'>No podcast is currently playing</span>
                </div>
            </footer>
        );
    }

    return (
        <footer className='h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4'>
            <div className='flex justify-between items-center h-full max-w-[1800px] mx-auto'>
                {/* Current Playing Podcast */}
                <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]'>
                    {currentPodcast && (
                        <>
                            <img
                                src={currentPodcast.imageUrl}
                                alt={currentPodcast.title}
                                className='w-14 h-14 object-cover rounded-md'
                            />
                            <div className='flex-1 min-w-0'>
                                <div className='font-medium truncate hover:underline cursor-pointer'>
                                    {currentPodcast.title}
                                </div>
                                <div className='text-sm text-zinc-400 truncate hover:underline cursor-pointer'>
                                    {currentPodcast.artist}
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {/* player controls*/}
                <div className='flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]'>
                    <div className='flex items-center gap-4 sm:gap-6'>
                        <Button
                            size='icon'
                            variant='ghost'
                            className='hover:text-white text-zinc-400'
                            onClick={playPrevious}
                            disabled={!currentPodcast}
                        >
                            <SkipBack className='h-4 w-4' />
                        </Button>

                        <Button
                            size='icon'
                            className='bg-white hover:bg-white/80 text-black rounded-full h-8 w-8'
                            onClick={togglePlay}
                            disabled={!currentPodcast}
                        >
                            {isPlaying ? <Pause className='h-5 w-5' /> : <Play className='h-5 w-5' />}
                        </Button>
                        <Button
                            size='icon'
                            variant='ghost'
                            className='hover:text-white text-zinc-400'
                            onClick={playNext}
                            disabled={!currentPodcast}
                        >
                            <SkipForward className='h-4 w-4' />
                        </Button>
                    </div>
                    <div className='hidden sm:flex items-center gap-2 w-full'>
                        <div className='text-xs text-zinc-400'>{formatDuration(currentTime)}</div>
                        <Slider
                            value={[currentTime]}
                            max={duration || 100}
                            step={1}
                            className='w-full hover:cursor-grab active:cursor-grabbing'
                            onValueChange={handleSeek}
                        />
                        <div className='text-xs text-zinc-400'>{formatDuration(duration)}</div>
                    </div>
                </div>
                <div className='hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end'>
                    <div className='flex items-center gap-2'>
                        <Button size='icon' variant='ghost' className='hover:text-white text-zinc-400'
                            onClick={isMute ? () => handleVolume([75]) : () => handleVolume([0])}
                        >
                            {
                                !isMute ? <Volume1 className='h-4 w-4' /> : <VolumeOff className='h-4 w-4' />
                            }
                        </Button>

                        <Slider
                            value={[volume]}
                            max={100}
                            step={1}
                            className='w-24 hover:cursor-grab active:cursor-grabbing'
                            onValueChange={handleVolume}
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default PlaybackControls

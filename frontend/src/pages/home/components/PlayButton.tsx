import { Button } from '@/components/ui/button';
import { usePlayerStore } from '@/store/usePlayerStore';
import type { Podcast } from '@/types';
import { Pause, Play } from 'lucide-react';


const PlayButton = ({ podcast }: { podcast: Podcast }) => {
    const { currentPodcast, togglePlay, setCurrentPodcast, isPlaying } = usePlayerStore();
    const isCurrentPodcastPlaying = currentPodcast?._id === podcast._id;


    const handlePlay = () => {
        if (isCurrentPodcastPlaying) togglePlay();
        else setCurrentPodcast(podcast);
    };

    return (
        <Button
			size={"icon"}
			onClick={handlePlay}
			className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
				opacity-0 translate-y-2 group-hover:translate-y-0 ${
					isCurrentPodcastPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
				}`}
		>
			{isCurrentPodcastPlaying && isPlaying ? (
				<Pause className='size-5 text-white' />
			) : (
				<Play className='size-5 text-white' />
			)}
		</Button>
    )
}

export default PlayButton

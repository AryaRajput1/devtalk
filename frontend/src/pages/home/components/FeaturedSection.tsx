import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { usePodcastStore } from "@/store/usePodcastStore";

const FeaturedSection = () => {
    const { isLoading, featuredPodcast, error } = usePodcastStore();

    if (isLoading) return <FeaturedGridSkeleton />;

    if (error) return <p className='text-red-500 mb-4 text-lg'>{error}</p>;

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
            {featuredPodcast.map((podcast) => (
                <div
                    key={podcast._id}
                    className='flex items-center bg-zinc-800/50 rounded-md overflow-hidden
         hover:bg-zinc-700/50 transition-colors group cursor-pointer relative shadow-sm'
                >
                    <img
                        src={podcast.imageUrl}
                        alt={podcast.title}
                        className='w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0'
                    />
                    <div className='flex-1 p-4'>
                        <p className='font-medium truncate'>{podcast.title}</p>
                        <p className='text-sm text-zinc-400 truncate'>{podcast.artist}</p>
                    </div>
                    {/* <PlayButton podcast={podcast} /> */}
                </div>
            ))}
        </div>
    );
};
export default FeaturedSection;
import Topbar from "@/components/Topbar"
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePodcastStore } from "@/store/usePodcastStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import SectionGrid from "./components/SectionGrid";
import { useUser } from "@clerk/clerk-react";
import { HeadphoneOffIcon } from "lucide-react";

const HomePage = () => {
    const { user } = useUser()
    const {
        isLoading,
        error,
        fetchFeaturedPodcasts,
        fetchMadeForYouPodcasts,
        fetchTrendingPodcasts,
        madeForYouPodcasts,
        trendingPodcast
    } = usePodcastStore();

    if (error) {
        return <div className='flex items-center justify-center h-full text-gray-500 flex-col'>
            <HeadphoneOffIcon className="size-8" />
            <h1 className='text-2xl font-bold mt-4'>{error || 'There is some error. Please try agian later!'}</h1>
        </div>
    }

    useEffect(() => {
        if (!user) return;

        fetchFeaturedPodcasts();
        fetchMadeForYouPodcasts();
        fetchTrendingPodcasts();
        console.log("Fetching podcasts...");
    }, [fetchFeaturedPodcasts, fetchMadeForYouPodcasts, fetchTrendingPodcasts, user]);
    return (
        <div className='dark:bg-gray-900 rounded-md'>
            <Topbar />
            <ScrollArea className='h-[calc(100vh-180px)]'>
                <div className='p-4 sm:p-6'>
                    <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good afternoon</h1>
                    <FeaturedSection />

                    <div className='space-y-8'>
                        <SectionGrid title='Made For You' podcasts={madeForYouPodcasts} isLoading={isLoading} />
                        <SectionGrid title='Trending' podcasts={trendingPodcast} isLoading={isLoading} />
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

export default HomePage

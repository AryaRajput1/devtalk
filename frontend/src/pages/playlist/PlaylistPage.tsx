import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/store/useMusicStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { AudioLines, Play } from "lucide-react";

const PlaylistPage = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const { fetchPlaylistById, currentPlaylist, isLoading } = useMusicStore();

  useEffect(() => {
    if (playlistId) {
      fetchPlaylistById(playlistId);
    }
  }, [playlistId, fetchPlaylistById]);

  if (isLoading) return null;

  if (!currentPlaylist) {
    return (
      <div className="flex items-center justify-center h-full text-white flex-col">
        <div>
          <AudioLines className="size-20 text-zinc-500 mb-4 relative" />
        </div>
        <h1 className="text-3xl font-bold">Playlist not found</h1>
        <p className="text-zinc-400 mt-2">The playlist you are looking for does not exist.</p>
      </div>

    );
  }
  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        {/* Main Content */}
        <div className='relative min-h-full'>
          {/* bg gradient */}
          <div
            className='absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80
					 to-zinc-900 pointer-events-none'
            aria-hidden='true'
          />
          {/* Content */}
          <div className='relative z-10'>
            <div className='flex p-6 gap-6 pb-8'>
              <img
                src={currentPlaylist?.imageUrl}
                alt={currentPlaylist?.title}
                className='w-[240px] h-[240px] shadow-xl rounded'
              />
              <div className='flex flex-col justify-end'>
                <p className='text-sm font-medium'>Playlist</p>
                <h1 className='text-7xl font-bold my-4'>{currentPlaylist?.title}</h1>
                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                  <span className='font-medium text-white'>{currentPlaylist?.artist}</span>
                  <span>• {currentPlaylist?.podcasts.length} audios</span>
                  <span>• {dayjs(currentPlaylist?.releaseDate).format('DD MMMM YYYY')}</span>
                </div>
              </div>
            </div>
            {/* play button */}
            <div className='px-6 pb-4 flex items-center gap-6'>
              <Button
                onClick={() => { }}
                size='icon'
                className='w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 
                hover:scale-105 transition-all cursor-pointer'
              >
                <Play className='h-7 w-7 text-black' />
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default PlaylistPage

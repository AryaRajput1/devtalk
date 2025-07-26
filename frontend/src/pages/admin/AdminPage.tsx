import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/useAuthStore';
import { usePodcastStore } from '@/store/usePodcastStore';
import { Album, Music } from 'lucide-react';
import  { useEffect } from 'react'
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import PodcastsTabContent from './components/PodcastsTabContent';
import PlaylistsTabContent from './components/PlaylistsTabContent';

const AdminPage = () => {
    const { isAdmin, isLoading } = useAuthStore();

	const { fetchPlaylists, fetchPodcasts, fetchStats } = usePodcastStore();

	useEffect(() => {
        console.log('Fetching initial data for admin page');
		fetchPlaylists();
		fetchPodcasts();
		fetchStats();
	}, [fetchPlaylists, fetchPodcasts, fetchStats]);

	if (!isAdmin && !isLoading) return <div>Unauthorized</div>;
  return (
<div
			className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8'
		>
			<Header />

			<DashboardStats />

			<Tabs defaultValue='podcasts' className='space-y-6'>
				<TabsList className='p-1 bg-zinc-800/50'>
					<TabsTrigger value='podcasts' className='data-[state=active]:bg-zinc-700'>
						<Music className='mr-2 size-4' />
						Podcasts
					</TabsTrigger>
					<TabsTrigger value='playlists' className='data-[state=active]:bg-zinc-700'>
						<Album className='mr-2 size-4' />
						Playlists
					</TabsTrigger>
				</TabsList>

				<TabsContent value='podcasts'>
					<PodcastsTabContent />
				</TabsContent>
				<TabsContent value='playlists'>
					<PlaylistsTabContent />
				</TabsContent>
			</Tabs>
		</div>

  )
}

export default AdminPage

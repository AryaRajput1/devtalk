import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { usePodcastStore } from "@/store/usePodcastStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const LeftSidebar = () => {
	const { playlistId } = useParams<{ playlistId: string }>();
	const { getAllPlaylists, playlists, isLoading } = usePodcastStore()

	useEffect(() => {
		getAllPlaylists();
	}, [getAllPlaylists]);

	return (
		<div className='h-full flex flex-col gap-2'>
			{/* Navigation menu */}

			<div className='rounded-lg bg-zinc-900 p-4'>
				<div className='space-y-2'>
					<Link
						to={"/"}
						className={cn(
							buttonVariants({
								variant: "ghost",
								className: "w-full justify-start text-white hover:bg-zinc-800",
							})
						)}
					>
						<HomeIcon className='mr-2 size-5' />
						<span className='hidden md:inline'>Home</span>
					</Link>

					<SignedIn>
						<Link
							to={"/chat"}
							className={cn(
								buttonVariants({
									variant: "ghost",
									className: "w-full justify-start text-white hover:bg-zinc-800",
								})
							)}
						>
							<MessageCircle className='mr-2 size-5' />
							<span className='hidden md:inline'>Messages</span>
						</Link>
					</SignedIn>
				</div>
			</div>

			{/* Library section */}
			<div className='flex-1 rounded-lg bg-zinc-900 p-4'>
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center text-white px-2'>
						<Library className='size-5 mr-2' />
						<span className='hidden md:inline'>Playlists</span>
					</div>
				</div>

				<ScrollArea className='h-[calc(100vh-300px)]'>
					{
						isLoading ? (<PlaylistSkeleton />) : (
							playlists?.length ? playlists?.map((playlist) => (
								<Link
									to={`/playlist/${playlist._id}`}
									key={playlist._id}
									className={
										cn(
											"flex items-center gap-2 p-2 rounded-md hover:bg-zinc-800 transition-colors",
											playlistId === playlist._id ? "bg-zinc-800/90" : "bg-transparent"
										)
									}
								>
									<img
										src={playlist.imageUrl}
										alt='Playlist img'
										className='size-12 rounded-md flex-shrink-0 object-cover border'
									/>

									<div className='flex-1 min-w-0 hidden md:block'>
										<p className='font-medium truncate'>{playlist.title}</p>
										<p className='text-sm text-zinc-400 truncate'>Album • {playlist.artist}</p>
									</div>
								</Link>
							)) : (
							<p className='text-zinc-400 text-sm'>No playlists found.</p>
							)
						)}
				</ScrollArea>
			</div>
		</div>
	);
};

export default LeftSidebar
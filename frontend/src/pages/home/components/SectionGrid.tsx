import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import type { Podcast } from "@/types";
import PlayButton from "./PlayButton";

type SectionGridProps = {
	title: string;
	podcasts: Podcast[];
	isLoading: boolean;
};
const SectionGrid = ({ podcasts, title, isLoading }: SectionGridProps) => {
	if (isLoading) return <SectionGridSkeleton />;

	return (
		<div className='mb-8'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
				<Button variant='link' className='text-sm text-zinc-400 hover:text-white'>
					Show all
				</Button>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{podcasts.map((podcast) => (
					<div
						key={podcast._id}
						className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer'
					>
						<div className='relative mb-4'>
							<div className='aspect-square rounded-md shadow-lg overflow-hidden'>
								<img
									src={podcast.imageUrl}
									alt={podcast.title}
									className='w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105'
								/>
							</div>
							<PlayButton podcast={podcast} />
						</div>
						<h3 className='font-medium mb-2 truncate'>{podcast.title}</h3>
						<p className='text-sm text-zinc-400 truncate'>{podcast.artist}</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default SectionGrid;
import { usePodcastStore } from "@/store/usePodcastStore";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const PodcastsTable = () => {
	const { podcasts, isLoading, error, deletePodcast, fetchStats } = usePodcastStore();

	if (!podcasts || podcasts.length === 0) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-zinc-400'>No podcasts available.</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-zinc-400'>Loading podcasts...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-red-400'>{error}</div>
			</div>
		);
	}

	return (
		<Table>
			<TableCaption>
				Manage your podcasts. You can add, edit, or delete podcasts from this list.
			</TableCaption>
			<TableHeader>
				<TableRow className='hover:bg-zinc-800/50'>
					<TableHead className='w-[50px]'></TableHead>
					<TableHead>Title</TableHead>
					<TableHead>Artist</TableHead>
					<TableHead>Release Date</TableHead>
					<TableHead className='text-right'>Actions</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{podcasts?.map((podcast) => (
					<TableRow key={podcast._id} className='hover:bg-zinc-800/50'>
						<TableCell>
							<img src={podcast.imageUrl} alt={podcast.title} className='size-10 rounded object-cover' />
						</TableCell>
						<TableCell className='font-medium'>{podcast.title}</TableCell>
						<TableCell>{podcast.artist}</TableCell>
						<TableCell>
							<span className='inline-flex items-center gap-1 text-zinc-400'>
								<Calendar className='h-4 w-4' />
								{podcast.createdAt.split("T")[0]}
							</span>
						</TableCell>

						<TableCell className='text-right'>
							<div className='flex gap-2 justify-end'>
								<Button
									variant={"ghost"}
									size={"sm"}
									className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
									onClick={() => deletePodcast(podcast._id)}
								>
									<Trash2 className='size-4' />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
export default PodcastsTable;
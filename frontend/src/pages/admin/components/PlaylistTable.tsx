import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePodcastStore } from "@/store/usePodcastStore";
import dayjs from "dayjs";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useEffect } from "react";

const PlaylistsTable = () => {
    const { playlists, deletePlaylist, fetchPlaylists } = usePodcastStore();

    useEffect(() => {
        fetchPlaylists();
    }, [fetchPlaylists]);

	if (!playlists || playlists.length === 0) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-zinc-400'>No playlist available.</div>
			</div>
		);
	}

    return (
        <Table>
            <TableCaption>
                Manage your playlists. You can add, edit, or delete playlists from this list.
            </TableCaption>
            <TableHeader>
                <TableRow className='hover:bg-zinc-800/50'>
                    <TableHead className='w-[50px]'></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Release Year</TableHead>
                    <TableHead>Songs</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {playlists.map((playlist) => (
                    <TableRow key={playlist._id} className='hover:bg-zinc-800/50'>
                        <TableCell>
                            <img src={playlist.imageUrl} alt={playlist.title} className='w-10 h-10 rounded object-cover' />
                        </TableCell>
                        <TableCell className='font-medium'>{playlist.title}</TableCell>
                        <TableCell>{playlist.artist}</TableCell>
                        <TableCell>
                            <span className='inline-flex items-center gap-1 text-zinc-400'>
                                <Calendar className='h-4 w-4' />
                                {dayjs(playlist.releaseDate).format('DD MMMM YYYY')}
                            </span>
                        </TableCell>
                        <TableCell>
                            <span className='inline-flex items-center gap-1 text-zinc-400'>
                                <Music className='h-4 w-4' />
                                {playlist.podcasts.length} songs
                            </span>
                        </TableCell>
                        <TableCell className='text-right'>
                            <div className='flex gap-2 justify-end'>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    onClick={() => deletePlaylist(playlist._id)}
                                    className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
                                >
                                    <Trash2 className='h-4 w-4' />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
export default PlaylistsTable;
import { axiosWrapper } from "@/utils/axiosWrapper";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Plus, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { AxiosError } from "axios";

const AddPlaylistDialog = () => {
    const [playlistDialogOpen, setPlaylistDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [newPlaylist, setNewPlaylist] = useState({
        title: "",
        artist: "",
        description: "",
        releaseDate: new Date().toISOString(),
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            if (!imageFile) {
                return toast.error("Please upload an image");
            }

            const formData = new FormData();
            formData.append("title", newPlaylist.title);
            formData.append("artist", newPlaylist.artist);
            formData.append("releaseDate", newPlaylist.releaseDate.toString());
            formData.append("description", newPlaylist.description)
            formData.append("imageFile", imageFile);

            await axiosWrapper.post("/admin/playlist", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setNewPlaylist({
                title: "",
                artist: "",
                description: "",
                releaseDate: new Date().toISOString(),
            });
            setImageFile(null);
            setPlaylistDialogOpen(false);
            toast.success("Playlist created successfully");
        } catch (error) {
            toast.error("Failed to create playlist: " + (error as AxiosError).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={playlistDialogOpen} onOpenChange={setPlaylistDialogOpen}>
            <DialogTrigger asChild>
                <Button className='bg-violet-500 hover:bg-violet-600 text-white'>
                    <Plus className='mr-2 h-4 w-4' />
                    Add Playlist
                </Button>
            </DialogTrigger>
            <DialogContent className='bg-zinc-900 border-zinc-700'>
                <DialogHeader>
                    <DialogTitle>Add New Playlist</DialogTitle>
                    <DialogDescription>Add a new playlist to your collection</DialogDescription>
                </DialogHeader>
                <div className='space-y-4 py-4'>
                    <input
                        type='file'
                        ref={fileInputRef}
                        onChange={handleImageSelect}
                        accept='image/*'
                        className='hidden'
                    />
                    <div
                        className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className='text-center'>
                            <div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
                                <Upload className='h-6 w-6 text-zinc-400' />
                            </div>
                            <div className='text-sm text-zinc-400 mb-2'>
                                {imageFile ? imageFile.name : "Upload playlist artwork"}
                            </div>
                            <Button variant='outline' size='sm' className='text-xs'>
                                Choose File
                            </Button>
                        </div>
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Playlist Title</label>
                        <Input
                            value={newPlaylist.title}
                            onChange={(e) => setNewPlaylist({ ...newPlaylist, title: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                            placeholder='Enter playlist title'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Playlist Description (Optional)</label>
                        <Input
                            value={newPlaylist.description}
                            onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                            placeholder='Enter playlist title'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Artist</label>
                        <Input
                            value={newPlaylist.artist}
                            onChange={(e) => setNewPlaylist({ ...newPlaylist, artist: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                            placeholder='Enter artist name'
                        />
                    </div>
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Release Year</label>
                        <Input
                            type='date'
                            value={newPlaylist.releaseDate}
                            onChange={(e) => setNewPlaylist({ ...newPlaylist, releaseDate: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                            placeholder='Enter release date'
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant='outline' onClick={() => setPlaylistDialogOpen(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className='bg-violet-500 hover:bg-violet-600'
                        disabled={isLoading || !imageFile || !newPlaylist.title || !newPlaylist.artist}
                    >
                        {isLoading ? "Creating..." : "Add Playlist"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default AddPlaylistDialog;
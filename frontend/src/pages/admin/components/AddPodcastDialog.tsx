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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePodcastStore } from "@/store/usePodcastStore";
import { axiosWrapper } from "@/utils/axiosWrapper";
import type { AxiosError } from "axios";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface NewPodcast {
    title: string;
    artist: string;
    playlist: string;
    duration: string;
}

const AddSongDialog = () => {
    const { playlists } = usePodcastStore();
    const [podcastDialogOpen, setPodcastDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [newPodcast, setNewPodcast] = useState<NewPodcast>({
        title: "",
        artist: "",
        playlist: "",
        duration: "0",
    });

    const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
        audio: null,
        image: null,
    });

    const audioInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            if (!files.audio || !files.image) {
                return toast.error("Please upload both audio and image files");
            }

            const formData = new FormData();

            formData.append("title", newPodcast.title);
            formData.append("artist", newPodcast.artist);
            formData.append("duration", newPodcast.duration);
            if (newPodcast.playlist && newPodcast.playlist !== "none") {
                formData.append("playlist", newPodcast.playlist);
            }

            formData.append("audioFile", files.audio);
            formData.append("imageFile", files.image);

            await axiosWrapper.post("/admin/podcast", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setNewPodcast({
                title: "",
                artist: "",
                playlist: "",
                duration: "0",
            });

            setFiles({
                audio: null,
                image: null,
            });
            toast.success("Song added successfully");
        } catch (error) {
            toast.error("Failed to add song: " + (error as AxiosError).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={podcastDialogOpen} onOpenChange={setPodcastDialogOpen}>
            <DialogTrigger asChild>
                <Button className='bg-emerald-500 hover:bg-emerald-600 text-black'>
                    <Plus className='mr-2 h-4 w-4' />
                    Add Podcast
                </Button>
            </DialogTrigger>

            <DialogContent className='bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto'>
                <DialogHeader>
                    <DialogTitle>Add New Podcast</DialogTitle>
                    <DialogDescription>Add a new podcast to your library</DialogDescription>
                </DialogHeader>

                <div className='space-y-4 py-4'>
                    <input
                        type='file'
                        accept='audio/*'
                        ref={audioInputRef}
                        hidden
                        onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))}
                    />

                    <input
                        type='file'
                        ref={imageInputRef}
                        className='hidden'
                        accept='image/*'
                        onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0] }))}
                    />

                    {/* image upload area */}
                    <div
                        className='flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer'
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <div className='text-center'>
                            {files.image ? (
                                <div className='space-y-2'>
                                    <div className='text-sm text-emerald-500'>Image selected:</div>
                                    <img
                                        src={URL.createObjectURL(files.image)}
                                        alt='Podcast Artwork'
                                        className='w-24 h-24 object-cover rounded mb-2'
                                    />
                                    <div className='text-xs text-zinc-400'>{files.image.name.slice(0, 20)}</div>
                                </div>
                            ) : (
                                <>
                                    <div className='p-3 bg-zinc-800 rounded-full inline-block mb-2'>
                                        <Upload className='h-6 w-6 text-zinc-400' />
                                    </div>
                                    <div className='text-sm text-zinc-400 mb-2'>Upload artwork</div>
                                    <Button variant='outline' size='sm' className='text-xs'>
                                        Choose File
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Audio upload */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Audio File</label>
                        <div className='flex items-center gap-2'>
                            <Button variant='outline' onClick={() => audioInputRef.current?.click()} className='w-full'>
                                {files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
                            </Button>
                        </div>
                    </div>

                    {/* other fields */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Title</label>
                        <Input
                            value={newPodcast.title}
                            onChange={(e) => setNewPodcast({ ...newPodcast, title: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Artist</label>
                        <Input
                            value={newPodcast.artist}
                            onChange={(e) => setNewPodcast({ ...newPodcast, artist: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Duration (seconds)</label>
                        <Input
                            type='number'
                            min="0"
                            value={newPodcast.duration}
                            onChange={(e) => setNewPodcast({ ...newPodcast, duration: e.target.value || "0" })}
                            className='bg-zinc-800 border-zinc-700'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Playlist (Optional)</label>
                        <Select
                            value={newPodcast.playlist}
                            onValueChange={(value) => setNewPodcast({ ...newPodcast, playlist: value })}
                        >
                            <SelectTrigger className='bg-zinc-800 border-zinc-700 w-full'>
                                <SelectValue placeholder='Select Playlist' />
                            </SelectTrigger>
                            <SelectContent className='bg-zinc-800 border-zinc-700'>
                                <SelectItem value='none'>No Playlist (Single)</SelectItem>
                                {playlists.map((playlist) => (
                                    <SelectItem key={playlist._id} value={playlist._id}>
                                        {playlist.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant='outline' onClick={() => setPodcastDialogOpen(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Uploading..." : "Add Song"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default AddSongDialog;
import { Playlist } from "../models/playlist.model.js";
import { uploadToCloudinary } from "../utilities/uploadToCloudinary.js";

export const createPodcast = async (req, res, next) => {
    try {
        const { audioFile, imageFile } = req.files || {};
        if (!audioFile || !imageFile) {
            return res.status(400).json({ message: 'Audio and image files are required.' });
        }

        const { title, artist, description, duration, playlistId } = req.body;

        if (!title || !artist || !duration || !playlistId) {
            return res.status(400).json({ message: 'Title, artist, duration, and playlistId are required.' });
        }

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const newPodcast = {
            title,
            artist,
            description,
            audioUrl,
            imageUrl,
            duration: parseInt(duration, 10),
            playlist: playlistId
        };

        // Assuming you have a Podcast model to save the podcast
        const podcast = await Podcast.create(newPodcast);

        await Playlist.findByIdAndUpdate(playlistId, {
            $push: { podcasts: podcast._id }
        })

        res.status(201).json({ message: 'Podcast created successfully', podcast });
    } catch (error) {
        next(error);
    }
}

export const deletePodcast = async (req, res, next) => {
    try {
        const { podcastId } = req.params;

        if (!podcastId) {
            return res.status(400).json({ message: 'Podcast ID is required.' });
        }

        const podcast = await Podcast.findByIdAndDelete(podcastId);

        if (!podcast) {
            return res.status(404).json({ message: 'Podcast not found.' });
        }

        await Playlist.findByIdAndUpdate(podcast.playlist, {
            $pull: { podcasts: podcast._id }
        });

        res.status(200).json({ message: 'Podcast deleted successfully' });

    } catch (error) {
        next(error);
    }
}

export const createPlaylist = async (req, res, next) => {
    try {
        const { imageFile } = req.files || {};
        if (!imageFile) {
            return res.status(400).json({ message: 'Image file is required.' });
        }

        const { title, description, artist, releaseDate } = req.body;

        if (!title || !artist) {
            return res.status(400).json({ message: 'Title and artist are required.' });
        }

        const imageUrl = await uploadToCloudinary(imageFile);

        const newPlaylist = {
            title,
            artist,
            description,
            imageUrl,
            releaseDate: releaseDate || new Date()
        };

        const playlist = await Playlist.create(newPlaylist);

        res.status(201).json({ message: 'Playlist created successfully', playlist });
    } catch (error) {
        next(error);
    }
}

export const deletePlaylist = async (req, res, next) => {
    try {

        const { playlistId } = req.params;

        if (!playlistId) {
            return res.status(400).json({ message: 'Playlist ID is required.' });
        }

        const playlist = await Playlist.findByIdAndDelete(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found.' });
        }

        // you can also delete all podcasts in this playlist
        await Podcast.deleteMany({ playlist: playlistId });
        res.status(200).json({ message: 'Playlist deleted successfully' });
    } catch (error) {
        next(error);
    }
}
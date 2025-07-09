import mongoose from 'mongoose';
import { Playlist } from '../models/playlist.model.js';
import 'dotenv/config';
import { Podcast } from '../models/podcast.model.js';

const PLAYLIST_DATA = [{
    title: 'JWT Authentication',
    artist: 'Arya Rajput',
    imageUrl: 'https://jwt.io/img/logo-asset.svg',
    description: 'A comprehensive guide to understanding and implementing JWT authentication in web applications.',
    podcasts: [],
    releaseDate: new Date()
}]

const PODCAST_DATA = [{
    title: 'Understanding JWT',
    artist: 'Arya Rajput',
    imageUrl: 'https://jwt.io/img/logo-asset.svg',
    description: 'An in-depth look at JSON Web Tokens, their structure, and how they work.',
    audioUrl: 'https://example.com/audio/understanding-jwt.mp3',
    duration: 1200, // 20 minutes in seconds
    playlist: null // Will be set later
}];

const seedPlaylistDate = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        await Playlist.deleteMany({});
        await Podcast.deleteMany({});
        console.log('Existing playlists cleared');

        if (PLAYLIST_DATA.length > 0) {
            const playlists = await Playlist.insertMany(PLAYLIST_DATA);

            const playlistId = playlists[0]._id;

            const podcasts = await Podcast.insertMany(PODCAST_DATA.map(podcast => ({
                ...podcast,
                playlist: playlistId
            })));

            await Playlist.updateOne({ _id: playlistId },
                { $set: { podcasts: podcasts.map(p => p._id) } });
                
            console.log('Playlist data seeded successfully');
        } else {
            console.log('No playlist data to seed');
        }

    } catch (error) {
        console.error('Error seeding playlist data:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seedPlaylistDate()
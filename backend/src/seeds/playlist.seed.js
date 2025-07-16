import mongoose from 'mongoose';
import { Playlist } from '../models/playlist.model.js';
import 'dotenv/config';
import { Podcast } from '../models/podcast.model.js';

const PLAYLIST_DATA = [{
    title: 'Backend Development Essentials',
    artist: 'Arya Rajput',
    imageUrl: 'https://www.clariontech.com/hubfs/Frontend%20vs%20Backend.jpg',
    description: 'A curated playlist for backend developers, covering essential topics and technologies.',
    podcasts: [],
    releaseDate: new Date()
}]

const PODCAST_DATA = [{
    title: 'Understanding JWT',
    artist: 'Arya Rajput',
    imageUrl: 'https://jwt.io/img/logo-asset.svg',
    description: 'An in-depth look at JSON Web Tokens, their structure, and how they work.',
    audioUrl: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
    duration: 1200, // 20 minutes in seconds
    playlist: null // Will be set later
},
{
    title: 'Understanding Caching',
    artist: 'Arya Rajput',
    imageUrl: 'https://askleo.askleomedia.com/wp-content/uploads/2013/11/cache.jpg',
    description: 'An in-depth look at Caching',
    audioUrl: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
    duration: 3600, // 20 minutes in seconds
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
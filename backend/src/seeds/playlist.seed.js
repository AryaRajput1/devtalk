import mongoose from 'mongoose';
import { Playlist } from '../models/playlist.model.js';
import 'dotenv/config';

const PLAYLIST_DATA = [{
    title: 'JWT Authentication',
    artist: 'Arya Rajput',
    imageUrl: 'https://jwt.io/img/logo-asset.svg',
    description: 'A comprehensive guide to understanding and implementing JWT authentication in web applications.',
    podcasts: [],
    releaseDate: new Date()
}]

const seedPlaylistDate = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        await Playlist.deleteMany({});
        console.log('Existing playlists cleared');

        if (PLAYLIST_DATA.length > 0) {
            await Playlist.insertMany(PLAYLIST_DATA, {
                duplicate: 'replace',
            });
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
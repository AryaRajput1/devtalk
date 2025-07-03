import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    podcasts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Podcast",
    }],
    releaseDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

export const Playlist = mongoose.model("Playlist", playlistSchema);
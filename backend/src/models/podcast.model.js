import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema({
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
    audioUrl: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: Number,
        required: true
    },
    playlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
        required: true
    }
}, {
    timestamps: true
})

export const Podcast = mongoose.model("Podcast", podcastSchema);
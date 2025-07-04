import { Podcast } from '../models/podcast.model.js';

export const getAllPodcasts = async (req, res, next) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        const skip = (page - 1) * limit;

        const podcasts = await Podcast.find({}).skip(skip).limit(parseInt(limit)).sort({ createdAt: -1 })

        return res.status(200).json({
            message: "Podcasts fetched successfully",
            podcasts
        });
    } catch (error) {
        next(error);
    }
}

export const getMadeForYouPodcasts = async (req, res, next) => {
    try {
        const podcasts = await Podcast.aggregate([
            {
                $sample: { size: 6 },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                },
            },
        ]);

        return res.status(200).json({
            message: "Made for your podcasts fetched successfully",
            podcasts
        });
    } catch (error) {
        next(error);
    }
}

export const getTrendingPodcasts = async (req, res, next) => {
    try {
        const podcasts = await Podcast.aggregate([
            {
                $sample: { size: 6 },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                },
            },
        ]);

        return res.status(200).json({
            message: "Trending podcasts fetched successfully",
            podcasts
        });
    } catch (error) {
        next(error);
    }
}

export const getFeaturedPodcasts = async (req, res, next) => {
    try {
        const podcasts = await Podcast.aggregate([
            {
                $sample: { size: 6 },
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                },
            },
        ]);

        return res.status(200).json({
            message: "Featured podcasts fetched successfully",
            podcasts
        });
    } catch (error) {
        next(error);
    }
}
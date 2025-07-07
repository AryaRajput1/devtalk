import { Playlist } from "../models/playlist.model.js";
import { Podcast } from "../models/podcast.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
    try {
        const [totalPodcasts, totalPlaylists, totalUsers, uniqueArtists] = await Promise.all([
            Podcast.countDocuments(),
            Playlist.countDocuments(),
            User.countDocuments(),
            Playlist.aggregate([
                {
                    $unionWith: {
                        coll: "albums",
                        pipeline: [],
                    },
                },
                {
                    $group: {
                        _id: "$artist",
                    },
                },
                {
					$count: "count",
				},
            ])

        ])

        return res.status(200).json({
            success: true,
            message: "Statistics fetched successfully",
            stats: {
                totalPlaylists,
                totalPodcasts,
                totalUsers,
                uniqueArtists
            }
        })

    } catch (error) {
        next(error);
    }
}
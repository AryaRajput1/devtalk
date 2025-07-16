export interface Playlist {
    _id: string;
    title: string;
    artist: string;
    description: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    podcasts: Podcast[];
    releaseDate: Date;
}

export interface Podcast {
    _id: string;
    title: string;
    artist: string;
    description: string;
    imageUrl: string;
    audioUrl: string;
    duration: number; 
    createdAt: string;
    updatedAt: string;
}

export interface User {
	_id: string;
	clerkId: string;
	fullName: string;
	imageUrl: string;
}

export interface Stats {
	totalPodcasts: number;
	totalPlaylists: number;
	totalUsers: number;
	totalArtists: number;
}

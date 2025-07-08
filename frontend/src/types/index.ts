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
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    audioUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
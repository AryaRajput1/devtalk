import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Plus } from "lucide-react";
import PodcastsTable from "./PodcastsTable";
const PodcastsTabContent = () => {
    return (
        <Card>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle className='flex items-center gap-2'>
                            <Music className='size-5 text-emerald-500' />
                            Podcasts Library
                        </CardTitle>
                        <CardDescription>Manage your podcasts</CardDescription>
                    </div>
                    {/* <AddSongDialog /> */}
                    <Button className='bg-emerald-500 hover:bg-emerald-600 text-black'>
                        <Plus className='mr-2 h-4 w-4' />
                        Add Song
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <PodcastsTable />
            </CardContent>
        </Card>
    );
};
export default PodcastsTabContent;

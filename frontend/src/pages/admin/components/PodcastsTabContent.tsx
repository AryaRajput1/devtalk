import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Plus } from "lucide-react";
import PodcastsTable from "./PodcastsTable";
import AddPodcastDialog from "./AddPodcastDialog";
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
                    <AddPodcastDialog />
                </div>
            </CardHeader>
            <CardContent>
                <PodcastsTable />
            </CardContent>
        </Card>
    );
};
export default PodcastsTabContent;

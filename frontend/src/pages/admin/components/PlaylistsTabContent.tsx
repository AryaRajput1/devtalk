import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Library } from "lucide-react";
import AddPlaylistDialog from "./AddPlaylistDialog";
import PlaylistsTable from "./PlaylistTable";

const PlaylistsTabContent = () => {
  return (
    <Card className='bg-zinc-800/50 border-zinc-700/50'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <Library className='h-5 w-5 text-violet-500' />
              Playlist Library
            </CardTitle>
            <CardDescription>Manage your playlist collection</CardDescription>
          </div>
          <AddPlaylistDialog />
        </div>
      </CardHeader>

      <CardContent>
        <PlaylistsTable />
      </CardContent>
    </Card>
  )
}

export default PlaylistsTabContent

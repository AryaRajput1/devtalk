import { useChatStore } from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { HeadphonesIcon, Users } from "lucide-react";
import { useEffect } from "react";

const RightSidebar = () => {
  const { users, fetchUsers } = useChatStore();
  const { user } = useUser();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  return (
    <div className='h-full bg-zinc-900 rounded-lg flex flex-col'>
      <div className='p-4 flex justify-between items-center border-b border-zinc-800'>
        <div className='flex items-center gap-2'>
          <Users className='size-5 shrink-0' />
          <h2 className='font-semibold'>What they're learning to</h2>
        </div>
      </div>
      {!user && <LoginPrompt />}
      <ScrollArea className='flex-1'>
        <div className='p-4 space-y-4'>
          {
            users.map((user) => (
              <div
                key={user._id}
                className='flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 cursor-pointer'
              >
                <img src={user.imageUrl} alt={user.fullName} className='w-10 h-10 rounded-full' />
                <div className='flex flex-col'>
                  <span className='text-sm font-medium text-white'>{user.fullName}</span>
                  <span className='text-xs text-zinc-400'>Listening to podcasts</span>
                </div>
              </div>
            ))
          }
        </div>
      </ScrollArea>
    </div>
  )
}
export default RightSidebar

const LoginPrompt = () => (
  <div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
    <div className='relative'>
      <div
        className='absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
        aria-hidden='true'
      />
      <div className='relative bg-zinc-900 rounded-full p-4'>
        <HeadphonesIcon className='size-8 text-emerald-400' />
      </div>
    </div>

    <div className='space-y-2 max-w-[250px]'>
      <h3 className='text-lg font-semibold text-white'>See What Developers Are Playing</h3>
      <p className='text-sm text-zinc-400'>Login to discover what podcast other developers are listening right now.</p>
    </div>
  </div>
);
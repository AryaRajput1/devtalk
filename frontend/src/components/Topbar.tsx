import { SignedOut, UserButton } from '@clerk/clerk-react';
import { HeadphonesIcon, LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignInWithGoogleButton from './SignInWithGoogleButton';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { useAuthStore } from '@/store/useAuthStore';

const Topbar = () => {
    const { isAdmin } = useAuthStore();

    return (
        <div
            className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10 rounded-md
    '
        >
            <div className='flex gap-2 items-center text-2xl font-bold text-white'>
                {/* Lucide Headphone Icon as Logo*/}
                <HeadphonesIcon className='size-8 text-emerald-500' />
                DevTalk
            </div>
            <div className='flex items-center gap-4'>
                {isAdmin && (
                    <Link to={"/admin"}
                        className={
                            cn(
                                buttonVariants({ variant: "outline" }),
                            )
                        }>
                        <LayoutDashboardIcon className='size-4  mr-2' />
                        Admin Dashboard
                    </Link>
                )}

                <SignedOut>
                    <SignInWithGoogleButton />
                </SignedOut>

                <UserButton />
            </div>
        </div>
    )
}

export default Topbar

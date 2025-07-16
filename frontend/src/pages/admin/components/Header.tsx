import { UserButton } from '@clerk/clerk-react';
import { HeadphonesIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3 mb-8'>
                <Link to='/' className='rounded-lg'>
                    <HeadphonesIcon className='size-10 text-emerald-500' />
                </Link>
                <div>
                    <h1 className='text-3xl font-bold'>Podcasts Manager</h1>
                    <p className='text-zinc-400 mt-1'>Manage your podcasts catalog</p>
                </div>
            </div>
            <UserButton />
        </div>
    );
}

export default Header

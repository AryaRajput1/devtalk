import { Card, CardContent } from '@/components/ui/card'
import { axiosWrapper } from '@/utils/axiosWrapper';
import { useUser } from '@clerk/clerk-react';
import { Loader } from 'lucide-react'
import { useEffect, useTransition } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthCallbackPage = () => {
  const [, startTransition] = useTransition();
  const { user, isLoaded } = useUser()

  const navigate = useNavigate();

  useEffect(() => {
    startTransition(async () => {
      try {
        if (!isLoaded || !user) {
          return;
        }

        await axiosWrapper.post('/auth/callback', {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        })

        navigate('/')
      } catch (error) {
        console.log('Error during authentication callback:', error);
        navigate('/')
      }
    })
  }, [isLoaded, user, navigate]);

  return (
    <div className='h-screen w-full bg-black flex items-center justify-center'>
      <Card className='w-[90%] max-w-md bg-zinc-900 border-zinc-800'>
        <CardContent className='flex flex-col items-center gap-4 pt-6'>
          <Loader className='size-6 text-emerald-500 animate-spin' />
          <h3 className='text-zinc-400 text-xl font-bold'>Logging you in</h3>
          <p className='text-zinc-400 text-sm'>Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthCallbackPage

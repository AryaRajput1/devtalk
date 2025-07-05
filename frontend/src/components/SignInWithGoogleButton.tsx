import { useSignIn } from '@clerk/clerk-react';
import { Button } from './ui/button';

const SignInWithGoogleButton = () => {
    const { isLoaded, signIn } = useSignIn();

    if (!isLoaded) {
        return null
    }
    const signInWithGoogle = async () => {
        signIn.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/auth-callback',
        })
    }
    return (
        <Button onClick={signInWithGoogle} className='w-full text-white border-zinc-200 h-11' variant='secondary'>
            Continue with Google
        </Button>
    )
}

export default SignInWithGoogleButton

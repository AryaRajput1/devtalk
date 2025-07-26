import { useSignUp } from '@clerk/clerk-react';
import { Button } from './ui/button';

const SignInWithGoogleButton = () => {
    const { isLoaded, signUp } = useSignUp();
    

    if (!isLoaded) {
        return null
    }
    const signInWithGoogle = async () => {
        signUp.authenticateWithRedirect({
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

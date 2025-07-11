import { useAuth } from '@clerk/clerk-react'
import React, { useEffect, useTransition, type ReactNode } from 'react'
import { updateApiToken } from '../utils/updateApiToken';
import { Loader } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { getToken } = useAuth();
    const [isLoading, startTransition] = useTransition();
    const { checkAdminStatus } = useAuthStore()

    useEffect(() => {
        startTransition(async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
                if (token) {
                    checkAdminStatus();
                }
            } catch (error) {
                updateApiToken(null);
                console.error('Error fetching token:', error);
            }
        })
    }, [getToken]);

    if (isLoading) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <Loader className='size-8 text-emerald-500 animate-spin' />
        </div>
    }

    return children
}

export default AuthProvider;

import { useAuth } from '@clerk/clerk-react'
import React, { useEffect, useTransition, type ReactNode } from 'react'
import { updateApiToken } from '../utils/updateApiToken';
import { Loader } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useChatStore } from '@/store/useChatStore';

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { getToken, userId } = useAuth();
    const [isLoading, startTransition] = useTransition();
    const { checkAdminStatus } = useAuthStore()
    const { initSocket, disconnectSocket } = useChatStore()

    useEffect(() => {
        startTransition(async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
                if (token) {
                    checkAdminStatus();
                    if (userId) initSocket(userId)
                }
            } catch (error) {
                updateApiToken(null);
                console.error('Error fetching token:', error);
            }
        })

        return () => {
            disconnectSocket()
        }
    }, [getToken, userId, initSocket, disconnectSocket, checkAdminStatus]);

    if (isLoading) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <Loader className='size-8 text-emerald-500 animate-spin' />
        </div>
    }

    return children
}

export default AuthProvider;

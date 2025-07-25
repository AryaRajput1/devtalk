import Topbar from '@/components/Topbar';
import { useChatStore } from '@/store/useChatStore';
import { useUser } from '@clerk/clerk-react';
import  { useEffect } from 'react'
import UsersList from './components/UsersList';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import ChatHeader from './components/ChatHeader';

const ChatPage = () => {
    const { user } = useUser();
    const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();

    useEffect(() => {
        if (user) fetchUsers();
    }, [fetchUsers, user]);

    useEffect(() => {
        if (selectedUser) fetchMessages(selectedUser.clerkId);
    }, [selectedUser, fetchMessages]);

    console.log('messages', messages)

    return (
        <main className='h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
            <Topbar />

            <div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
                <UsersList />

                {/* chat message */}
                <div className='flex flex-col h-full'>
                    {selectedUser ? (
                        <>
                            <ChatHeader />

                            {/* Messages */}
                            <ScrollArea className='h-[calc(100vh-340px)]'>
                                <div className='p-4 space-y-4'>
                                    {messages.map((message) => (
                                        <div
                                            key={message._id}
                                            className={`flex items-start gap-3 ${message.senderId === user?.id ? "flex-row-reverse" : ""
                                                }`}
                                        >
                                            <Avatar className='size-8'>
                                                <AvatarImage
                                                    src={
                                                        message.senderId === user?.id
                                                            ? user.imageUrl
                                                            : selectedUser.imageUrl
                                                    }
                                                />
                                            </Avatar>

                                            <div
                                                className={`rounded-lg p-3 max-w-[70%]
													${message.senderId === user?.id ? "bg-green-500" : "bg-zinc-800"}
												`}
                                            >
                                                <p className='text-sm'>{message.content}</p>
                                                <span className='text-xs text-zinc-300 mt-1 block'>
                                                    {/* {formatTime(message.createdAt)} */}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            {/* <MessageInput /> */}
                        </>
                    ) : (
                        // <NoConversationPlaceholder />
                        null
                    )}
                </div>
            </div>
        </main>
    )
}

export default ChatPage

import { MessageCircleDashedIcon } from "lucide-react"

export const NoConversationPlaceholder = () => (
    <div className='flex flex-col items-center justify-center h-full space-y-6'>
        <MessageCircleDashedIcon className="size-12 animate-pulse" />
        <div className='text-center'>
            <h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
            <p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
        </div>
    </div>
);
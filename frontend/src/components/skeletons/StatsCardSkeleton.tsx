import { Card, CardContent } from "@/components/ui/card";

const StatsCardsSkeleton = () => {
	return (<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 '>
		{
			Array.from({ length: 4 }).map((_, i) => (
				<Card key={i} className='bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors animate-pulse'>
					<CardContent className='p-6'>
						<div className='flex items-center gap-4'>
							<div className={`p-3 rounded-lg animate-pulse bg-zinc-700 size-7`} />
							<div className="flex flex-col gap-2">
								<p className='bg-zinc-600 animate-pulse h-2 w-20 rounded-lg' />
								<p className='bg-zinc-400 animate-plus h-6 w-6  rounded-lg' />
							</div>
						</div>
					</CardContent>
				</Card>
			))
		}
	</div>
	);
};
export default StatsCardsSkeleton;
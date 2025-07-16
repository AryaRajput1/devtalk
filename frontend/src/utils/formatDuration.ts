export const formatDuration = (seconds: number) => {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	return `${minutes}:${parseInt(remainingSeconds.toString()).toString().padStart(2, "0")}`;
};
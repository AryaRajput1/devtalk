import { v2 as cloudinary } from 'cloudinary';
export const uploadToCloudinary = async (file) => {
    try {

        const result = await cloudinary.uploader.upload(file)

        return result.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
        console.log('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload file to Cloudinary');
    }
}
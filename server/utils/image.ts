import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    secure: true
});

export async function uploadImage(base64Url: string) {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        const result = await cloudinary.uploader.upload(base64Url, options);
        return result.secure_url;
    } catch (error) {
        console.error(error);
    }
}

const cloudinary = require("../config/cloudinary.js");
const streamifier = require("streamifier");

/**
 * Upload một file lên Cloudinary
 * @param buffer Dữ liệu file
 * @param folder Thư mục lưu ảnh trên Cloudinary
 * @returns URL ảnh trên Cloudinary
 */

const uploadSingleFile = (buffer, folder = "LifeTex_TTS") => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            { folder: folder },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(stream);
    });
};

/**
 * Upload nhiều file lên Cloudinary
 * @param buffer Dữ liệu file
 * @param folder Thư mục lưu ảnh trên Cloudinary
 * @returns Danh sách URL ảnh đã upload
 */

const uploadMultipleFiles = async (buffer, folder = "LifeTex_TTS") => {
    let urls = [];
    for (let i = 0; i < buffer.length; i++) {
        let result = await uploadSingleFile(buffer[i], folder);
        urls.push(result.secure_url);
    }
    return urls;
}

module.exports = { uploadSingleFile, uploadMultipleFiles };
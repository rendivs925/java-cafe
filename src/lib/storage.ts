import { storage } from "./firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { nanoid } from "nanoid";

export const uploadFile = async (file: File, folder: string) => {
  try {
    const filename = nanoid();
    const storageRef = ref(
      storage,
      `${folder}${filename}.${file.name.split(".").pop()}`
    );
    const res = await uploadBytes(storageRef, file);

    return res.metadata.fullPath;
  } catch (error) {
    throw error;
  }
};

export const handleUpload = async (file: File, folder = "products") => {
  const imagePath = await uploadFile(file, `${folder}/`);
  const imageUrl = await getFile(imagePath);

  return imageUrl;
};

export async function deleteFile(filePath: string) {
  try {
    // Create a reference to the file to delete
    const fileRef = ref(storage, filePath);

    // Delete the file
    await deleteObject(fileRef);

    console.log("File deleted successfully.");

    return {
      status: "success",
      message: "File deleted successfully.",
    };
  } catch (error) {
    console.error("Error deleting file:", error);
    return {
      status: "error",
      message: "Failed to delete file.",
    };
  }
}

export const getFile = async (path: string) => {
  try {
    const fileRef = ref(storage, path);
    return getDownloadURL(fileRef);
  } catch (error) {
    throw error;
  }
};

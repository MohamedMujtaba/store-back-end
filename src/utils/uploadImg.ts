import { Response } from "express";
import { cloudinary } from "./cloudinary";

export const uploadImg = async (res: Response, images: string[]) => {
  try {
    const promises: any[] = [];
    images.map((image: string) => {
      promises.push(
        cloudinary.uploader.upload(image, {
          upload_preset: "test-dev",
        })
      );
    });
    const r = await Promise.all(promises);
    const fr = r.map((i) => {
      return {
        public_id: i.public_id,
        url: i.secure_url,
      };
    });

    return fr;
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Something went wrong will uploading your images 😴" });
  }
};

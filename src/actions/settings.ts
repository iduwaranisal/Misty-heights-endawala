"use server";

import { connectDB } from "@/lib/db";
import Setting from "@/models/Setting";
import { verifyAdminSession } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

// Auto-configure from CLOUDINARY_URL in environment variables
cloudinary.config({
  secure: true
});

export async function getSettings() {
  await connectDB();
  const settings = await Setting.find({}).lean();
  
  // Convert _id to string
  return settings.map((s) => ({
    ...s,
    _id: s._id.toString(),
  }));
}

export async function getSettingByKey(key: string, defaultValue: any = null) {
  await connectDB();
  const setting = await Setting.findOne({ key }).lean();
  return setting ? setting.value : defaultValue;
}

export async function saveSetting(key: string, value: any, type: string = "string", description?: string) {
  const admin = await verifyAdminSession();
  if (!admin) return { success: false, message: "Unauthorized" };

  await connectDB();
  await Setting.findOneAndUpdate(
    { key },
    { value, type, description },
    { upsert: true, new: true }
  );

  revalidatePath("/");
  return { success: true, message: "Setting saved successfully" };
}

export async function saveMultipleSettings(
  settingsMap: Record<string, { value: any; type?: string; description?: string } | any>
) {
  const admin = await verifyAdminSession();
  if (!admin) return { success: false, message: "Unauthorized" };

  try {
    await connectDB();
    const ops = Object.entries(settingsMap).map(([key, data]) => {
      const isObj = data && typeof data === "object" && "value" in data && !Array.isArray(data);
      const value = isObj ? data.value : data;
      const type = isObj && data.type ? data.type : (typeof value === "object" ? "json" : typeof value === "number" ? "number" : typeof value === "boolean" ? "boolean" : "string");
      const description = isObj && data.description ? data.description : undefined;

      return {
        updateOne: {
          filter: { key },
          update: { $set: { key, value, type, description } },
          upsert: true,
        },
      };
    });

    if (ops.length > 0) {
      await Setting.bulkWrite(ops);
    }

    revalidatePath("/");
    return { success: true, message: "Settings saved successfully" };
  } catch (error: any) {
    console.error("saveMultipleSettings error:", error);
    return { success: false, message: error.message || "Failed to save settings" };
  }
}

export async function deleteSetting(key: string) {
  const admin = await verifyAdminSession();
  if (!admin) return { success: false, message: "Unauthorized" };

  try {
    await connectDB();
    await Setting.deleteOne({ key });
    revalidatePath("/");
    return { success: true, message: "Setting deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete setting" };
  }
}

export async function uploadImageToCloudinary(formData: FormData) {
  const admin = await verifyAdminSession();
  if (!admin) return { success: false, message: "Unauthorized" };

  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, message: "No file provided" };

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload using stream to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "misty-heights-website" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const url = (uploadResult as any).secure_url;

    // Optional: save to setting if key provided
    const key = formData.get("key") as string;
    if (key) {
      await connectDB();
      await Setting.findOneAndUpdate(
        { key },
        { value: url, type: "image", description: formData.get("description") || "Uploaded Image" },
        { upsert: true }
      );
      revalidatePath("/");
    }

    return { success: true, url, message: "Image uploaded successfully" };
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    return { success: false, message: "Image upload failed: " + error.message };
  }
}

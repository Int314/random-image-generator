import { NextResponse } from "next/server";
import { selectBestMedia } from "@/utils/mediaSelector";

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const PIXABAY_IMAGE_API = "https://pixabay.com/api/";
const PIXABAY_VIDEO_API = "https://pixabay.com/api/videos/";

export async function GET(request: Request) {
  if (!PIXABAY_API_KEY) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const mediaType = searchParams.get("type") || "image";
  const category = searchParams.get("category") || "";
  const query = searchParams.get("q") || "";
  const orientation = searchParams.get("orientation") || "";

  try {
    const apiUrl =
      mediaType === "video" ? PIXABAY_VIDEO_API : PIXABAY_IMAGE_API;

    const params = new URLSearchParams({
      key: PIXABAY_API_KEY,
      image_type: "photo",
      video_type: "film",
      editors_choice: "true",
      per_page: "200",
      ...(query && { q: query }),
      ...(category && { category }),
      ...(orientation && mediaType === "image" && { orientation }),
    });

    const response = await fetch(`${apiUrl}?${params}`);

    if (!response.ok) {
      throw new Error("Failed to fetch from Pixabay");
    }

    const data = await response.json();

    if (!data.hits || data.hits.length === 0) {
      return NextResponse.json({ error: "No media found" }, { status: 404 });
    }

    const selectedMedia = selectBestMedia(data.hits);

    if (!selectedMedia) {
      return NextResponse.json(
        { error: "No suitable media found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      media: selectedMedia,
      type: mediaType,
      totalHits: data.totalHits,
    });
  } catch (error) {
    console.error("Error fetching from Pixabay:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 },
    );
  }
}

import Photos from "@/components/photos";
import { fetchPhotos } from "@/lib/data";
import React, { Suspense } from "react";

// 每小时更新一次
export const revalidate = 3600;

async function PhotoContainer({ params }) {
  const { catName } = await params;
  const cat = decodeURIComponent(catName);
  const photos = await fetchPhotos({ category: cat });

  if (!photos || photos.length === 0) {
    return (
      <div className="mt-12 text-center text-2xl">
        There are no photo in this category.
      </div>
    );
  }

  return <Photos photos={photos} />;
}

export default function Home({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhotoContainer params={params} />
    </Suspense>
  );
}

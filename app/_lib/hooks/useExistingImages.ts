import { useState } from "react";
import { supabase } from "@/app/_lib/supabase";

type ExistingImage = { id: string; url: string; is_primary: boolean };

export function useExistingImages(initial: ExistingImage[] = []) {
  const [existingImages, setExistingImages] =
    useState<ExistingImage[]>(initial);

  async function removeExistingImage(imageId: string): Promise<void> {
    const confirmed = confirm("Remove this image?");
    if (!confirmed) return;

    const result = await supabase
      .from("product_images")
      .delete()
      .eq("id", imageId);
    if (result.error) {
      alert("Failed to remove image");
      return;
    }
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  }

  async function setPrimaryImage(
    productId: string,
    imageId: string,
  ): Promise<void> {
    await supabase
      .from("product_images")
      .update({ is_primary: false })
      .eq("product_id", productId);

    const result = await supabase
      .from("product_images")
      .update({ is_primary: true })
      .eq("id", imageId);

    if (result.error) {
      alert("Failed to set primary image");
      return;
    }

    setExistingImages((prev) =>
      prev.map((img) => ({ ...img, is_primary: img.id === imageId })),
    );
  }

  return {
    existingImages,
    setExistingImages,
    removeExistingImage,
    setPrimaryImage,
  };
}

import Image from "next/image";
import { photos, type PhotoKey } from "@/lib/images";
import { cn } from "@/lib/utils";

type Props = {
  photo: PhotoKey;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  quality?: number;
};

/** Füllt den (relativ positionierten) Eltern-Container vollständig aus. */
export default function Photo({ photo, alt, sizes = "100vw", priority, className, quality }: Props) {
  return (
    <Image
      src={photos[photo]}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={cn("object-cover", className)}
    />
  );
}

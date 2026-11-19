import Image from "next/image";
import type { CSSProperties } from "react";

type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: CSSProperties;
};

export default function Photo({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  style,
}: PhotoProps) {
  if (src.startsWith("data:") || src.startsWith("http")) {
    return <img src={src} alt={alt} className={`h-full w-full object-cover ${className}`} style={style} loading={priority ? "eager" : "lazy"} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
      style={style}
    />
  );
}

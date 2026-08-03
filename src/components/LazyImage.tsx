import Image from "next/image";

export function LazyImage({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw",
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={80}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="object-cover"
        style={{ objectPosition }}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  );
}

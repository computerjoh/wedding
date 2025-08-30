import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const images = [
  'images/5.jpg',
  'images/1.jpg',
  'images/2.jpg',
  'images/3.jpg',
];

export function ImageCarousel() {
  const [loaded, setLoaded] = useState<boolean[]>(
    Array(images.length).fill(false)
  );

  const handleLoad = (index: number) => {
    setLoaded((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <Carousel className="w-full max-w-2xl mx-auto mb-8" >
      <CarouselContent>
        {images.map((src, idx) => (
          <CarouselItem key={idx}>
            <div className="w-full aspect-[3/2] relative rounded-lg shadow overflow-hidden">
              {!loaded[idx] && (
                <Skeleton className="absolute inset-0 w-full h-full" />
              )}
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                onLoad={() => handleLoad(idx)}
                onError={() => handleLoad(idx)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${loaded[idx] ? 'opacity-100' : 'opacity-0'
                  }`}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}

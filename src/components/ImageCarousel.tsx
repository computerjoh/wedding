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
    <div className="w-full max-w-3xl mx-auto mb-12">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {images.map((src, idx) => (
            <CarouselItem key={idx}>
              <div className="w-full aspect-[4/3] relative rounded-xl shadow-lg overflow-hidden">
                {!loaded[idx] && (
                  <Skeleton className="absolute inset-0 w-full h-full" />
                )}
                <img
                  src={src}
                  alt={`Wedding photo ${idx + 1}`}
                  onLoad={() => handleLoad(idx)}
                  onError={() => handleLoad(idx)}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${
                    loaded[idx] ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          Swipe or use arrows to navigate
        </p>
      </div>
    </div>
  );
}

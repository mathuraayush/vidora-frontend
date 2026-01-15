import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PlayCircle } from 'lucide-react';

export default function HomePage() {
  // This will be populated with real video data later
  const mockVideos = Array(12).fill(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-xl mb-2">Home</h1>
        <p className="text-muted-foreground body-md">
          Discover amazing videos from creators around the world
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockVideos.map((_, index) => (
          <Card key={index} className="group cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-muted rounded-t-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="h-16 w-16 text-muted-foreground/50" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  10:24
                </div>
              </div>

              {/* Video Info */}
              <div className="p-3 space-y-2">
                <div className="flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
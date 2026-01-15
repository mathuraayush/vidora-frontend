import { useEffect, useState } from 'react';
import { userAPI } from '../api/user.api';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { History, PlayCircle } from 'lucide-react';

export default function WatchHistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getWatchHistory();
        setHistory(response.data || []);
      } catch (error) {
        toast.error('Failed to load watch history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          {Array(5).fill(null).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <History className="h-8 w-8 text-primary" />
        <div>
          <h1 className="heading-xl">Watch History</h1>
          <p className="text-muted-foreground body-md">
            Videos you've watched recently
          </p>
        </div>
      </div>

      {history.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <PlayCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="heading-md mb-2">No watch history</h3>
            <p className="text-muted-foreground body-md">
              Videos you watch will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {history.map((video, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  {/* Video Thumbnail */}
                  <div className="relative w-full sm:w-48 aspect-video bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <PlayCircle className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration || '10:24'}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 space-y-2">
                    <h3 className="heading-md line-clamp-2">
                      {video.title || 'Video Title'}
                    </h3>
                    
                    {video.owner && (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={video.owner.avatar} />
                          <AvatarFallback className="text-xs">
                            {video.owner.fullName?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">
                          {video.owner.fullName}
                        </span>
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {video.description || 'No description available'}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{video.views || 0} views</span>
                      <span>•</span>
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
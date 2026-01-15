import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userAPI } from '../api/user.api';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Users, Video } from 'lucide-react';

export default function ChannelPage() {
  const { username } = useParams();
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getChannelProfile(username);
        setChannel(response.data);
      } catch (error) {
        toast.error('Failed to load channel');
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [username]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full rounded-lg" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Channel not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <div className="relative h-48 rounded-lg overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
        {channel.coverImage && (
          <img
            src={channel.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Channel Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar className="h-24 w-24 border-4 border-background">
          <AvatarImage src={channel.avatar} alt={channel.fullName} />
          <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
            {channel.fullName?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div>
            <h1 className="heading-xl">{channel.fullName}</h1>
            <p className="text-muted-foreground body-md">@{channel.username}</p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Badge variant="secondary" className="gap-1">
              <Users className="h-3 w-3" />
              {channel.subscribersCount} subscribers
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Video className="h-3 w-3" />
              {channel.channelSubscribedToCount} subscriptions
            </Badge>
          </div>

          <Button 
            className="mt-2"
            variant={channel.isSubscribed ? "outline" : "default"}
          >
            {channel.isSubscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        </div>
      </div>

      {/* Channel Content Tabs */}
      <Tabs defaultValue="videos" className="w-full">
        <TabsList>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="col-span-full text-center py-12">
              <CardContent>
                <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No videos yet</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="heading-md mb-4">About {channel.fullName}</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> {channel.email}</p>
                <p><strong>Subscribers:</strong> {channel.subscribersCount}</p>
                <p><strong>Subscriptions:</strong> {channel.channelSubscribedToCount}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
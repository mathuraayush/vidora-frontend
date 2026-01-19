import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { videoAPI } from "@/services/video.service";
import { historyAPI } from "@/services/history.service";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

function Watch() {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await videoAPI.getVideoById(videoId);
        setVideo(data);

        // 🔑 Side effects
        videoAPI.incrementViews(videoId);
        historyAPI.addToHistory(videoId);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (loading) return <p>Loading...</p>;
  if (!video) return <p>Video not found</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LEFT: VIDEO */}
      <div className="lg:col-span-2 space-y-4">
        {/* PLAYER */}
        <div className="rounded-xl overflow-hidden bg-black">
          <video
            src={video.videoFile}
            controls
            autoPlay
            className="w-full aspect-video"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-xl font-semibold leading-snug">
          {video.title}
        </h1>

        {/* META */}
        <p className="text-sm text-muted-foreground">
          {video.views} views •{" "}
          {new Date(video.createdAt).toLocaleDateString()}
        </p>

        <Separator />

        {/* CHANNEL */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={video.owner.avatar} />
            </Avatar>

            <div>
              <p className="font-medium">{video.owner.username}</p>
              <p className="text-xs text-muted-foreground">
                {video.owner.subscribersCount || 0} subscribers
              </p>
            </div>
          </div>

          <Button>Subscribe</Button>
        </div>

        <Separator />

        {/* DESCRIPTION */}
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="whitespace-pre-line text-sm">
            {video.description}
          </p>
        </div>
      </div>

      {/* RIGHT: SIDEBAR (Next up / Suggestions later) */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Suggested videos coming soon…
        </p>
      </div>
    </div>
  );
}

export default Watch;

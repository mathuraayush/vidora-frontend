import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video._id}`} className="block group">
      <div className="space-y-3">
        {/* Thumbnail */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Info */}
        <div className="flex gap-3">
          <Avatar className="h-9 w-9 mt-1">
            <AvatarImage src={video.owner.avatar} />
          </Avatar>

          <div>
            <h3 className="font-semibold leading-snug line-clamp-2">
              {video.title}
            </h3>

            <p className="text-sm text-muted-foreground">
              {video.owner.username}
            </p>

            <p className="text-xs text-muted-foreground">
              {video.views} views •{" "}
              {new Date(video.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;

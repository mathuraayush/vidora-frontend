import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video._id}`} className="group">
      <div className="space-y-2">
        {/* Thumbnail */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover group-hover:scale-105 transition"
          />
        </div>

        {/* Info */}
        <div className="flex gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={video.owner.avatar} />
          </Avatar>

          <div className="space-y-1">
            <h3 className="font-medium leading-snug line-clamp-2">
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

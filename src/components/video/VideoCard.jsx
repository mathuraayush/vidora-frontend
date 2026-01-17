import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link to={`/watch/${video._id}`}>
      <Card className="hover:bg-accent transition">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video rounded-t-md object-cover"
        />

        <CardContent className="flex gap-3 pt-3">
          <Avatar>
            <AvatarImage src={video.owner.avatar} />
          </Avatar>

          <div className="space-y-1">
            <h3 className="font-medium line-clamp-2">
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
        </CardContent>
      </Card>
    </Link>
  );
}

export default VideoCard;

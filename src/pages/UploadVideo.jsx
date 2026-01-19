import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { videoAPI } from "@/services/video.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function UploadVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !thumbnail) {
      toast.error("Missing files", {
        description: "Please upload both video and thumbnail",
      });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);

    try {
      setLoading(true);
      await videoAPI.uploadVideo(formData);

      toast.success("Video uploaded successfully 🎉", {
        description: "Redirecting to your videos...",
      });

      setTimeout(() => {
        navigate("/your-videos");
      }, 1200);
    } catch {
      toast.error("Upload failed", {
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Video</CardTitle>
          <CardDescription>
            Share your content with the world. Fill in the details below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* DETAILS */}
            <div className="space-y-4">
              <h3 className="font-medium">Details</h3>

              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  placeholder="Add a clear and descriptive title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Tell viewers about your video"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <Input
                  placeholder="react, backend, javascript"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Helps people find your video
                </p>
              </div>
            </div>

            {/* MEDIA */}
            <div className="space-y-6">
              <h3 className="font-medium">Media</h3>

              {/* VIDEO */}
              <div className="space-y-2">
                <Label>Video File</Label>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setVideoFile(file);
                    setVideoPreview(URL.createObjectURL(file));
                  }}
                />

                {videoPreview && (
                  <video
                    src={videoPreview}
                    controls
                    className="mt-2 rounded-lg w-full"
                  />
                )}
              </div>

              {/* THUMBNAIL */}
              <div className="space-y-2">
                <Label>Thumbnail</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setThumbnail(file);
                    setThumbnailPreview(URL.createObjectURL(file));
                  }}
                />

                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="mt-2 rounded-lg w-full aspect-video object-cover"
                  />
                )}
              </div>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Publish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UploadVideo;

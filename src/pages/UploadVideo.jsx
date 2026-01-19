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

function UploadVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile || !thumbnail) {
      alert("Please upload both video and thumbnail");
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
      alert("Video uploaded successfully 🎉");
    } catch {
      alert("Upload failed");
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
            <div className="space-y-4">
              <h3 className="font-medium">Media</h3>

              <div className="space-y-2">
                <Label>Video File</Label>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                />
                {videoFile && (
                  <p className="text-xs text-muted-foreground">
                    Selected: {videoFile.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Thumbnail</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
                {thumbnail && (
                  <p className="text-xs text-muted-foreground">
                    Selected: {thumbnail.name}
                  </p>
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

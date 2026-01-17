import { useEffect, useState } from "react";
import VideoCard from "@/components/video/VideoCard";
import { videoAPI } from "@/services/video.service";

function Home() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    if (loading || !hasNextPage) return;

    setLoading(true);
    const data = await videoAPI.getAllVideos(page);

    setVideos(prev => [...prev, ...data.docs]);
    setHasNextPage(data.hasNextPage);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {videos.map(video => (
        <VideoCard key={video._id} video={video} />
      ))}

      {loading && <p className="col-span-full text-center">Loading...</p>}
    </div>
  );
}

export default Home;

import React, { useEffect, useRef } from "react";

interface VideoProps {
  src: string;
  width: number;
  height: number;
}

const Video: React.FC<VideoProps> = ({ src, width, height }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.src = src;
    }
  }, [src]);

  return (
    <video ref={videoRef} width={width} height={height} controls>
      Sorry, your browser doesn't support embedded videos.
    </video>
  );
};

export default Video;

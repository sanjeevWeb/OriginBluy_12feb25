import React from "react";
import MediaCard from "./MediaCard";

const MediaLayout = ({ media }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {media.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MediaLayout;

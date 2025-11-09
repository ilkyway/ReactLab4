import { useState } from 'react';
import { Blurhash } from 'react-blurhash';

function Gallery({ images , onClick}){
  const [loadedImages, setLoadedImages] = useState(new Set());

  if (!images || images.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "200px",
          padding: "0 10px",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            color: "#666"
          }}
        >
          Nothing here
        </p>
      </div>
    );
  }

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "0 10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        {images.map((img, i) => {
          const isLoaded = loadedImages.has(img.id);
          const hasBlurHash = img.blur_hash && img.blur_hash.trim() !== '';

          return (
            <div
              key={img.id}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: `400px`,
                height: `250px`,
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
              className="gallery-item"
              onClick={()=>{onClick(img)}}
            >
              {/* BlurHash placeholder */}
              {hasBlurHash && !isLoaded && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Blurhash
                    hash={img.blur_hash}
                    width={400}
                    height={250}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                  />
                </div>
              )}
              
              {/* Actual image */}
              <img
                src={img.url}
                alt={img.description || "Gallery image"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: isLoaded ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
                onLoad={() => handleImageLoad(img.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
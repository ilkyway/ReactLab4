import React, { useState, useEffect } from 'react';
import { Blurhash } from 'react-blurhash';

function Popup({ value, onClose, setQuery }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (value) {
      setImageLoaded(false);
    }
  }, [value?.id]);

  if (value == null) return null;

  const hasBlurHash = value.blur_hash && value.blur_hash.trim() !== '';

  return (
    <div
      onMouseDown={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="popup"
        style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: 16,
          padding: 24,
          width: '90%',
          maxWidth: 520,
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.3)',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          transform: 'scale(1)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: '#222' }}>View details</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              fontSize: 26,
              color: '#555',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#000')}
            onMouseLeave={(e) => (e.target.style.color = '#555')}
          >
            ×
          </button>
        </div>

        {/* Image */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 20 }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 400,
              height: 250,
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            }}
          >
            {/* BlurHash placeholder */}
            {hasBlurHash && !imageLoaded && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <Blurhash
                  hash={value.blur_hash}
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
              key={value.id}
              src={value.url}
              alt={value.description || "Image"}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: '#ddd', margin: '12px 0' }}></div>

        {/* Description */}
        <h3 style={{ textAlign: 'start', color: '#333', fontSize: 17, fontWeight: 500, lineHeight: 1.4 }}>
          <span style={{ fontWeight: 600 }}>Description:</span> {value.description}
        </h3>

        <div style={{ height: 1, backgroundColor: '#ddd', margin: '12px 0' }}></div>

        {/* Created at */}
        <h3 style={{ textAlign: 'start', color: '#333', fontSize: 17, fontWeight: 500 }}>
          <span style={{ fontWeight: 600 }}>Created at:</span> {value.created_at}
        </h3>

        <div style={{ height: 1, backgroundColor: '#ddd', margin: '12px 0' }}></div>

        {/* Author */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3 style={{ textAlign: 'start', color: '#333', fontSize: 17, fontWeight: 600 }}>Author:</h3>
          <div
            style={{
              backgroundColor: 'rgb(183 193 241)',
              display: 'flex',
              alignItems: 'center',
              padding: '4px 10px',
              borderRadius: 9999,
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)',
              cursor: "pointer",
            }}
            onClick={()=>{setQuery(`@${value.author.username}`); onClose()}}
          >
            <div
              style={{
                width: 32,
                height: 32,
                backgroundImage: `url(${value.author.avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '50%',
                border: '1px solid #ccc',
              }}
            ></div>
            <h4 style={{ margin: '0 6px', color: '#222', fontWeight: 500 }}>{value.author.name}</h4>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#222',
              color: '#fff',
              border: 'none',
              padding: '10px 22px',
              borderRadius: 24,
              fontSize: 15,
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
              transition: 'background 0.25s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#444')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#222')}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;

import React, { useState, useEffect, useRef } from 'react';

interface ShahinPortraitProps {
  className?: string;
}

export function ShahinPortrait({ className = '' }: ShahinPortraitProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved =
        localStorage.getItem('shahin_portrait_photo') ||
        localStorage.getItem('shahin_profile_photo');
      if (saved) return saved;
    }
    return '/shahin-alam.png';
  });

  const [hasError, setHasError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (
        (e.key === 'shahin_portrait_photo' || e.key === 'shahin_profile_photo') &&
        e.newValue
      ) {
        setPhotoSrc(e.newValue);
        setHasError(false);
      }
    };

    const handleCustom = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail) {
        setPhotoSrc(custom.detail);
        setHasError(false);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('shahin-photo-updated', handleCustom);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('shahin-photo-updated', handleCustom);
    };
  }, []);

  const handleImageError = () => {
    if (photoSrc === '/shahin-alam.png') {
      setPhotoSrc('/shahin-alam.jpg');
    } else if (photoSrc === '/shahin-alam.jpg') {
      setPhotoSrc('/Shahin.png');
    } else if (photoSrc === '/Shahin.png') {
      setPhotoSrc('Shahin.png');
    } else if (photoSrc === 'Shahin.png') {
      setPhotoSrc('/Shahin.jpeg');
    } else {
      setHasError(true);
    }
  };

  const saveAndBroadcastPhoto = (dataUrl: string) => {
    setPhotoSrc(dataUrl);
    setHasError(false);
    try {
      localStorage.setItem('shahin_portrait_photo', dataUrl);
      localStorage.setItem('shahin_profile_photo', dataUrl);
      window.dispatchEvent(
        new CustomEvent('shahin-photo-updated', { detail: dataUrl })
      );
    } catch {
      // Ignore localStorage quota errors
    }
  };

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          saveAndBroadcastPhoto(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <figure
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`relative aspect-[4/5] rounded-3xl sm:rounded-[44px] bg-[#F8F9FA] dark:bg-[#1A1B1E] overflow-hidden shadow-2xl border border-[var(--line)] cursor-pointer group transition-all duration-300 ${
        isDragging ? 'ring-4 ring-[var(--lime)] scale-[1.01]' : ''
      } ${className}`}
      title="Click or drop image to set profile photo"
      aria-label="Profile photo of Shahin Alam · Product Designer"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="hidden"
        aria-hidden="true"
      />

      {/* Profile Photo Display */}
      {!hasError ? (
        <img
          src={photoSrc}
          alt="Shahin Alam · Product Designer"
          onError={handleImageError}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Fallback Graphic matching Shahin Alam's new Suit + Glasses Headshot */
        <div className="w-full h-full flex flex-col items-center justify-between bg-white dark:bg-[#141518] p-6 text-center select-none">
          <svg
            viewBox="0 0 400 480"
            className="w-full h-[82%] object-contain"
            aria-label="Portrait of Shahin Alam"
          >
            <defs>
              <linearGradient id="suitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E232A" />
                <stop offset="100%" stopColor="#0F1216" />
              </linearGradient>
              <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E5A675" />
                <stop offset="100%" stopColor="#C98854" />
              </linearGradient>
            </defs>

            {/* Suit & White Shirt */}
            <path
              d="M 50 480 C 60 380, 110 340, 150 330 L 180 370 C 190 380, 210 380, 220 370 L 250 330 C 290 340, 340 380, 350 480 Z"
              fill="url(#suitGrad)"
            />
            {/* White Shirt Collar */}
            <polygon points="175,340 200,390 185,340" fill="#FFFFFF" />
            <polygon points="225,340 200,390 215,340" fill="#FFFFFF" />
            <polygon points="180,340 200,380 220,340" fill="#F0F2F5" />

            {/* Neck */}
            <rect x="175" y="270" width="50" height="70" rx="8" fill="#B87747" />

            {/* Head Contour */}
            <path
              d="M 140 210 C 135 125, 265 125, 260 210 C 260 260, 245 305, 200 305 C 155 305, 140 260, 140 210 Z"
              fill="url(#faceGrad)"
            />

            {/* Thick Dark Wavy Hair */}
            <path
              d="M 132 200 C 122 110, 155 60, 200 55 C 245 60, 278 110, 268 200 C 255 150, 230 115, 200 116 C 170 115, 145 150, 132 200 Z"
              fill="#181412"
            />
            <path d="M 180 62 Q 200 40 220 62 Q 235 48 245 70" stroke="#251E1A" strokeWidth="6" strokeLinecap="round" fill="none" />

            {/* Groomed Full Beard & Mustache */}
            <path
              d="M 140 225 C 138 280, 160 305, 200 305 C 240 305, 262 280, 260 225 C 255 265, 235 292, 200 294 C 165 292, 145 265, 140 225 Z"
              fill="#171310"
            />
            <path d="M 180 270 Q 200 274 220 270 Q 200 282 180 270 Z" fill="#171310" />

            {/* Eyes */}
            <circle cx="175" cy="225" r="5" fill="#15110E" />
            <circle cx="225" cy="225" r="5" fill="#15110E" />

            {/* Spectacles / Glasses (Matching Shahin's modern dark metal frame) */}
            {/* Left Frame */}
            <rect x="150" y="210" width="45" height="32" rx="7" fill="none" stroke="#2B303A" strokeWidth="3.5" />
            {/* Right Frame */}
            <rect x="205" y="210" width="45" height="32" rx="7" fill="none" stroke="#2B303A" strokeWidth="3.5" />
            {/* Bridge */}
            <path d="M 195 220 Q 200 216 205 220" stroke="#2B303A" strokeWidth="3" fill="none" />
            {/* Temples */}
            <line x1="150" y1="220" x2="135" y2="216" stroke="#2B303A" strokeWidth="3" />
            <line x1="250" y1="220" x2="265" y2="216" stroke="#2B303A" strokeWidth="3" />
          </svg>

          <div className="flex flex-col items-center gap-1.5 pb-2">
            <span className="text-xs font-bold text-[var(--ink)]">
              Shahin Alam · Product Designer
            </span>
            <span className="text-[11px] text-[var(--mute)] bg-[var(--soft)] py-1 px-3 rounded-full font-semibold">
              Drop photo or click to choose file
            </span>
          </div>
        </div>
      )}

      {/* Subtle Drag Overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center text-white text-sm font-bold p-4 z-30">
          Drop photo here to set profile picture
        </div>
      )}
    </figure>
  );
}

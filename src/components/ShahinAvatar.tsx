import { useState, useEffect } from 'react';

interface ShahinAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  alt?: string;
}

export function ShahinAvatar({
  className = 'w-10 h-10',
  alt = 'Shahin Alam'
}: ShahinAvatarProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shahin_portrait_photo') || localStorage.getItem('shahin_profile_photo');
      if (saved) return saved;
    }
    return '/shahin-alam.png';
  });

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if ((e.key === 'shahin_portrait_photo' || e.key === 'shahin_profile_photo') && e.newValue) {
        setImgSrc(e.newValue);
        setHasError(false);
      }
    };
    const handleCustom = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail) {
        setImgSrc(custom.detail);
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

  const handleError = () => {
    if (imgSrc === '/shahin-alam.png') {
      setImgSrc('/shahin-alam.jpg');
    } else if (imgSrc === '/shahin-alam.jpg') {
      setImgSrc('/Shahin.png');
    } else if (imgSrc === '/Shahin.png') {
      setImgSrc('Shahin.png');
    } else if (imgSrc === 'Shahin.png') {
      setImgSrc('/Shahin.jpeg');
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 border-2 border-[var(--card)] shadow-[0_0_0_1.5px_var(--ink)] bg-[#B4380E] select-none ${className}`}
      title="Shahin Alam · Product Designer"
    >
      {!hasError ? (
        <img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          className="w-full h-full object-cover object-[center_20%] rounded-full block"
          referrerPolicy="no-referrer"
        />
      ) : (
        /* Stylized SVG Portrait matching Shahin's exact uploaded photograph (warm amber studio lighting, styled dark hair, neat beard, grey t-shirt) */
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full block"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Shahin Alam portrait"
        >
          <defs>
            <radialGradient id="shahinGlow" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#FF7A00" />
              <stop offset="45%" stopColor="#D9480F" />
              <stop offset="85%" stopColor="#8A1C00" />
              <stop offset="100%" stopColor="#4A0E00" />
            </radialGradient>
            <linearGradient id="shahinSkin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2A676" />
              <stop offset="60%" stopColor="#CD8855" />
              <stop offset="100%" stopColor="#AD6A3B" />
            </linearGradient>
            <linearGradient id="shahinShirt" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#888C94" />
              <stop offset="100%" stopColor="#5E626A" />
            </linearGradient>
          </defs>

          {/* Warm Studio Background Glow */}
          <circle cx="50" cy="50" r="50" fill="url(#shahinGlow)" />

          {/* Shoulders / Grey T-Shirt */}
          <path
            d="M18 96 C22 78 35 72 50 72 C65 72 78 78 82 96 Z"
            fill="url(#shahinShirt)"
          />
          {/* T-Shirt Collar */}
          <path
            d="M38 72 C42 80 58 80 62 72 Z"
            fill="#45484E"
            opacity="0.7"
          />

          {/* Neck */}
          <path
            d="M41 58 L41 74 C46 76 54 76 59 74 L59 58 Z"
            fill="#B97442"
          />

          {/* Ears */}
          <circle cx="31" cy="48" r="5.5" fill="#CD8855" />
          <circle cx="69" cy="48" r="5.5" fill="#CD8855" />

          {/* Head / Face */}
          <ellipse cx="50" cy="46" rx="18" ry="21" fill="url(#shahinSkin)" />

          {/* Hair - Voluminous styled upward dark hair */}
          <path
            d="M30 42 C30 23 37 14 50 14 C63 14 70 23 70 42 C67 36 61 31 50 31 C39 31 33 36 30 42 Z"
            fill="#141518"
          />
          <path
            d="M34 26 C40 18 48 16 54 16 C62 16 66 20 68 28 C64 24 57 22 50 22 C42 22 36 24 34 26 Z"
            fill="#2A2C31"
          />

          {/* Eyebrows */}
          <path d="M36 39 Q42 36 47 38" stroke="#141518" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M53 38 Q58 36 64 39" stroke="#141518" strokeWidth="2.4" strokeLinecap="round" fill="none" />

          {/* Eyes */}
          <ellipse cx="42" cy="43" rx="2.5" ry="1.8" fill="#141518" />
          <ellipse cx="58" cy="43" rx="2.5" ry="1.8" fill="#141518" />
          <circle cx="42.8" cy="42.5" r="0.7" fill="#FFFFFF" />
          <circle cx="58.8" cy="42.5" r="0.7" fill="#FFFFFF" />

          {/* Nose */}
          <path d="M50 43 L48.5 50 Q50 52 51.5 50 Z" fill="#B36938" />

          {/* Beard & Mustache - Groomed full beard matching photo */}
          <path
            d="M40 54 Q50 52 60 54 C58 57 54 58 50 58 C46 58 42 57 40 54 Z"
            fill="#141518"
          />
          <path
            d="M33 46 C33 60 41 68 50 68 C59 68 67 60 67 46 C67 52 65 61 58 64 C53 66 47 66 42 64 C35 61 33 52 33 46 Z"
            fill="#141518"
          />
        </svg>
      )}
    </div>
  );
}

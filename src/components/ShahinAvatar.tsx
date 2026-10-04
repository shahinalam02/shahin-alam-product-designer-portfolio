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
      const saved =
        localStorage.getItem('shahin_portrait_photo') ||
        localStorage.getItem('shahin_profile_photo') ||
        localStorage.getItem('shahin_avatar_photo');
      if (saved) return saved;
    }
    const envUrl = (import.meta as unknown as { env?: { VITE_PROFILE_IMAGE_URL?: string } }).env?.VITE_PROFILE_IMAGE_URL;
    return envUrl || '/shahin-alam.png';
  });

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (
        (e.key === 'shahin_portrait_photo' ||
          e.key === 'shahin_profile_photo' ||
          e.key === 'shahin_avatar_photo') &&
        e.newValue
      ) {
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
    // Try common alternate filenames before declaring error
    if (imgSrc === '/shahin-alam.png') {
      setImgSrc('/shahin-portrait.jpg');
    } else if (imgSrc === '/shahin-portrait.jpg') {
      setImgSrc('/profile.jpg');
    } else if (imgSrc === '/profile.jpg') {
      setImgSrc('/shahin-avatar.png');
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 border-2 border-[var(--card)] shadow-[0_0_0_1.5px_var(--ink)] bg-[var(--soft)] select-none flex items-center justify-center ${className}`}
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
        /* Clean Monogram Badge matching portfolio brand if image is missing */
        <div className="w-full h-full flex items-center justify-center bg-[var(--lime)] text-[var(--lime-ink)] font-display font-extrabold text-sm tracking-tight">
          SA
        </div>
      )}
    </div>
  );
}

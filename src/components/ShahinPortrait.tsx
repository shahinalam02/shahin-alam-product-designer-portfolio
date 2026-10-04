import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';
import { useProjects } from '../context/ProjectsContext';

interface ShahinPortraitProps {
  className?: string;
}

const resolveAssetUrl = (path: string) => {
  if (path.startsWith('data:') || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || './';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
};

export function ShahinPortrait({ className = '' }: ShahinPortraitProps) {
  const { isAdmin } = useProjects();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [photoSrc, setPhotoSrc] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved =
        localStorage.getItem('shahin_portrait_photo') ||
        localStorage.getItem('shahin_profile_photo');
      if (saved) return saved;
    }
    const envUrl = (import.meta as unknown as { env?: { VITE_PROFILE_IMAGE_URL?: string } }).env?.VITE_PROFILE_IMAGE_URL;
    return envUrl ? resolveAssetUrl(envUrl) : resolveAssetUrl('shahin-alam.png');
  });

  const [hasError, setHasError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (
        (e.key === 'shahin_portrait_photo' || e.key === 'shahin_profile_photo') &&
        e.newValue
      ) {
        setPhotoSrc(resolveAssetUrl(e.newValue));
        setHasError(false);
      }
    };

    const handleCustom = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail) {
        setPhotoSrc(resolveAssetUrl(custom.detail));
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
    // Try candidate filenames with relative base resolution
    const candidates = ['shahin-portrait.jpg', 'profile.jpg', 'shahin-avatar.png'];
    const currentClean = photoSrc.replace(/^.*\//, '');
    const nextIndex = candidates.indexOf(currentClean) + 1;

    if (nextIndex > 0 && nextIndex < candidates.length) {
      setPhotoSrc(resolveAssetUrl(candidates[nextIndex]));
    } else if (currentClean === 'shahin-alam.png') {
      setPhotoSrc(resolveAssetUrl('shahin-portrait.jpg'));
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
      setUploadNotice('Photo updated! To make permanent on GitHub/Vercel, save to public/shahin-alam.png');
      setTimeout(() => setUploadNotice(null), 5000);
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
    if (!isAdmin) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <figure
      onDragOver={(e) => {
        if (!isAdmin) return;
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`relative aspect-[4/5] rounded-3xl sm:rounded-[44px] bg-[var(--card)] overflow-hidden shadow-2xl border border-[var(--line)] group transition-all duration-300 ${
        isDragging ? 'ring-4 ring-[var(--lime)] scale-[1.01]' : ''
      } ${className}`}
      aria-label="Portrait of Shahin Alam · Product Designer"
    >
      {isAdmin && (
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
      )}

      {/* Profile Photo Display */}
      {!hasError ? (
        <div className="w-full h-full relative">
          <img
            src={photoSrc}
            alt="Shahin Alam · Product Designer"
            onError={handleImageError}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />

          {/* Admin-only Change Photo Overlay on hover */}
          {isAdmin && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="absolute bottom-4 right-4 bg-[var(--ink)]/85 text-[var(--paper)] text-xs font-semibold py-2 px-3.5 rounded-full shadow-lg border border-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 cursor-pointer hover:bg-[var(--ink)]"
              title="Click to choose a new profile photo"
            >
              <Camera className="w-3.5 h-3.5 text-[var(--lime)]" />
              <span>Change photo</span>
            </button>
          )}
        </div>
      ) : (
        /* Clean Professional Monogram Card */
        <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--card)] p-8 text-center select-none border-2 border-dashed border-[var(--line2)] rounded-3xl sm:rounded-[44px]">
          <div className="w-20 h-20 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] flex items-center justify-center font-display font-bold text-3xl mb-4 shadow-sm">
            SA
          </div>
          <h3 className="font-display font-bold text-2xl text-[var(--ink)] mb-1">
            Shahin Alam
          </h3>
          <p className="text-xs text-[var(--mute)] max-w-xs mb-6">
            Product Designer · UI/UX Architect
          </p>

          {isAdmin && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-[var(--lime)] text-[var(--lime-ink)] font-bold text-xs shadow-sm hover:opacity-95 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Photo</span>
            </button>
          )}
        </div>
      )}

      {/* Floating Upload Notification */}
      {uploadNotice && (
        <div className="absolute top-4 left-4 right-4 bg-[var(--ink)] text-[var(--paper)] text-xs font-semibold py-2 px-3 rounded-2xl shadow-xl border border-[var(--lime)] text-center animate-fade z-20">
          {uploadNotice}
        </div>
      )}
    </figure>
  );
}

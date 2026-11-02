import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { VIDEOS } from '../data/videos';
import { PRODUCTS } from '../data/products';
import { formatPKR, createProductWhatsAppUrl } from '../config/storeConfig';
import { Product } from '../types/store';

interface VideoShowcaseSectionProps {
  onQuickView: (product: Product) => void;
}

export const VideoShowcaseSection: React.FC<VideoShowcaseSectionProps> = ({
  onQuickView,
}) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeVideo = VIDEOS[activeVideoIndex] || VIDEOS[0];
  const linkedProduct = PRODUCTS.find((p) => p.id === activeVideo?.productId);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSelectVideo = (index: number) => {
    setActiveVideoIndex(index);
    setIsPlaying(false);
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Convert youtube watch URL to embed URL if needed
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <section id="videos" className="py-20 bg-[#090E1A] border-t border-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real Hands-On Demonstrations</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              See Our Gadgets in Action
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md mt-2 md:mt-0">
            Real hardware tests, magnetic levitation stability, and optical projections captured live in studio.
          </p>
        </div>

        {/* Video Player & Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Screen */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl group">
              {activeVideo ? (
                activeVideo.videoType === 'youtube' ? (
                  <iframe
                    src={getEmbedUrl(activeVideo.videoUrl)}
                    title={activeVideo.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      src={activeVideo.videoUrl}
                      poster={activeVideo.thumbnail}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      className="w-full h-full object-cover"
                      playsInline
                    />

                    {/* Overlay Play/Pause Button when paused */}
                    {!isPlaying && (
                      <div
                        onClick={togglePlay}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer backdrop-blur-[2px] transition-all"
                      >
                        <div className="w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 transform hover:scale-110 transition-all duration-200">
                          <Play className="w-7 h-7 fill-slate-950 ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Custom Player Controls Bar */}
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>

                        <button
                          type="button"
                          onClick={toggleMute}
                          className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        <span className="text-xs font-mono text-slate-300 tabular-nums">
                          {activeVideo.duration}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleFullscreen}
                        className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer"
                        aria-label="Fullscreen"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                  No video configured yet.
                </div>
              )}
            </div>

            {/* Current Video Details & Connected Product Card */}
            <div className="p-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase">
                  <span>{activeVideo.badge || 'Demonstration'}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-400 font-mono">{activeVideo.duration}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{activeVideo.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {activeVideo.description}
                </p>
              </div>

              {/* Linked Product Buy CTA */}
              {linkedProduct && (
                <div className="shrink-0 flex items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <div className="hidden sm:block text-right">
                    <div className="text-[11px] text-slate-400">Featured in Video</div>
                    <div className="text-sm font-bold font-mono text-white tabular-nums">
                      {formatPKR(linkedProduct.pricePKR)}
                    </div>
                  </div>

                  <a
                    href={createProductWhatsAppUrl(linkedProduct.name, linkedProduct.pricePKR, 1, linkedProduct.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-[#25D366] hover:bg-[#1EA952] text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <MessageSquare className="w-4 h-4 fill-slate-950 stroke-none" />
                    <span>Order Product</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onQuickView(linkedProduct)}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors cursor-pointer"
                    title="View Product Specs"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Playlist / Video Selector Column */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Select Demonstration ({VIDEOS.length})
            </div>

            <div className="space-y-2.5">
              {VIDEOS.map((vid, idx) => {
                const isSelected = idx === activeVideoIndex;
                return (
                  <button
                    key={vid.id}
                    type="button"
                    onClick={() => handleSelectVideo(idx)}
                    className={`w-full p-3 rounded-xl border text-left flex gap-3 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/60 shadow-md shadow-amber-500/5'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="relative w-20 aspect-video rounded-lg overflow-hidden shrink-0 bg-slate-950 border border-slate-800">
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className={`w-3.5 h-3.5 ${isSelected ? 'fill-amber-400 text-amber-400' : 'fill-white text-white'}`} />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <h4 className="text-xs font-semibold text-white line-clamp-1">
                        {vid.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {vid.badge}
                      </p>
                      <span className="text-[10px] font-mono text-amber-400/90 tabular-nums">
                        {vid.duration}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

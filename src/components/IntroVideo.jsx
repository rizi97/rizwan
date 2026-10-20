import { useState } from 'react';
import { createPortal } from 'react-dom';
import useDialog from '../lib/useDialog.js';
import { INTRO_VIDEO } from '../config/site.js';

const { id, title, durationLabel } = INTRO_VIDEO;
// youtube-nocookie: no YouTube cookies until the visitor actually plays the video.
const embedSrc = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
const poster = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export const PlayIcon = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
    <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.8-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14z" fill="currentColor" />
  </svg>
);

const Player = () => (
  <iframe
    src={embedSrc}
    title={title}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
);

/**
 * Click-to-play video. Shows a lazy-loaded thumbnail and only loads the YouTube
 * player once the visitor presses play, so it costs nothing on page load.
 */
export function IntroVideoInline() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="video-frame">
      {playing ? (
        <Player />
      ) : (
        <button type="button" className="video-facade" onClick={() => setPlaying(true)} aria-label={`Play video: ${title} (${durationLabel})`}>
          <img src={poster} alt="" width="1280" height="720" loading="lazy" decoding="async" onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
          <span className="video-play">
            <PlayIcon size={30} />
          </span>
          <span className="video-duration">{durationLabel}</span>
        </button>
      )}
    </div>
  );
}

/** Button that opens the intro video in a popup (used in the homepage hero). */
export function IntroVideoButton() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const ref = useDialog(open, { onClose: close });
  return (
    <>
      <button type="button" className="video-cta" onClick={() => setOpen(true)}>
        <span className="video-cta-icon">
          <PlayIcon size={16} />
        </span>
        <span>
          Watch my 1-min intro <span className="video-cta-time">{durationLabel}</span>
        </span>
      </button>
      {open &&
        createPortal(
          <div className="dialog-backdrop" onClick={(e) => e.target === e.currentTarget && close()}>
            <div ref={ref} className="video-dialog" role="dialog" aria-modal="true" aria-label="Rizwan’s intro video" tabIndex={-1}>
              <div className="video-dialog-bar">
                <span className="eyebrow">Meet Rizwan · {durationLabel}</span>
                <button type="button" className="icon-btn" onClick={close} aria-label="Close video" data-autofocus="">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="video-frame">
                <Player />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

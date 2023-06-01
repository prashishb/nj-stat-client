import { formatDateNew } from './valueFormatter';

import { createFileName } from 'use-react-screenshot';
import html2canvas from 'html2canvas';
import { isMobile } from 'react-device-detect';

const handleScreenshot = (
  event,
  albumContainerRefs,
  trackContainerRef,
  updatedAt
) => {
  const index = event.currentTarget.getAttribute('data-album-index');
  const ref =
    index !== null
      ? albumContainerRefs.current[index]
      : trackContainerRef.current;
  if (!ref) return;
  html2canvas(ref, {
    allowTaint: false,
    useCORS: true,
    height: ref.offsetHeight - 7,
    padding: 2,
    ignoreElements: (element) => element.id === 'screenshot-share-icon',
  }).then((canvas) => {
    canvas.toBlob((blob) => {
      if (isMobile && navigator.share) {
        // Web Share API is supported and device is mobile
        const file = new File(
          [blob],
          createFileName(`spotify_${ref.id}_${formatDateNew(updatedAt)}.png`),
          { type: 'image/png' }
        );
        navigator
          .share({
            files: [file],
          })
          .catch((error) => console.log('Sharing failed', error));
      } else {
        // Fallback for desktop or browsers that don't support the Web Share API
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = createFileName(
          `spotify_${ref.id}_${formatDateNew(updatedAt)}`
        );
        link.click();
      }
    });
  });
};

export default handleScreenshot;

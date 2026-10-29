"use client";

import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "@primer/octicons-react";
import { useEffect, useId, useRef, useState } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  background?: string;
};

type ProjectGalleryProps = {
  projectName: string;
  images: readonly GalleryImage[];
};

export function ProjectGallery({ projectName, images }: ProjectGalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const titleId = useId();
  const selectedImage = images[selectedIndex ?? 0];

  useEffect(() => {
    if (selectedIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [selectedIndex]);

  function openImage(index: number) {
    setSelectedIndex(index);
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }

  function moveImage(direction: number) {
    setSelectedIndex((index) => ((index ?? 0) + direction + images.length) % images.length);
  }

  if (!selectedImage) return null;

  return (
    <div className="project-gallery">
      <button className="gallery-cover" style={{ backgroundColor: images[0].background }} type="button" onClick={() => openImage(0)} aria-haspopup="dialog" aria-label={`View ${projectName} gallery, ${images.length} images`}>
        <Image src={images[0].src} alt={images[0].alt} width={images[0].width} height={images[0].height} sizes="(max-width: 767px) calc(100vw - 64px), (max-width: 1094px) 55vw, 400px" />
        {images.length > 1 && <span className="gallery-cover-count" aria-hidden="true">+{images.length - 1}<span>{images.length === 2 ? "photo" : "photos"}</span></span>}
      </button>

      <dialog
        ref={dialogRef}
        className="gallery-viewer"
        aria-labelledby={titleId}
        onClose={() => setSelectedIndex(null)}
        onCancel={() => setSelectedIndex(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            moveImage(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
            event.currentTarget.close();
          }
        }}
      >
        <div className="gallery-viewer-header">
          <h4 id={titleId} className="gallery-viewer-title">{projectName} · {selectedImage.caption}</h4>
          <button className="gallery-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close screenshot viewer"><XIcon size={18} aria-hidden="true" /></button>
        </div>
        <Image className="gallery-viewer-image" style={{ backgroundColor: selectedImage.background }} src={selectedImage.src} alt={selectedImage.alt} width={selectedImage.width} height={selectedImage.height} sizes="(max-width: 767px) 90vw, 590px" />
        <div className="gallery-viewer-controls">
          <button className="gallery-nav" type="button" onClick={() => moveImage(-1)} disabled={images.length < 2} aria-label="Previous screenshot"><ChevronLeftIcon size={18} aria-hidden="true" /></button>
          <span className="gallery-counter" aria-live="polite">{(selectedIndex ?? 0) + 1} / {images.length}</span>
          <button className="gallery-nav" type="button" onClick={() => moveImage(1)} disabled={images.length < 2} aria-label="Next screenshot"><ChevronRightIcon size={18} aria-hidden="true" /></button>
        </div>
      </dialog>
    </div>
  );
}

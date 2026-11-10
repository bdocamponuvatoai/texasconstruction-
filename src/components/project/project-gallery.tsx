"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { images } from "@/content/images";
import type { Project } from "@/content/projects";
import { pad2 } from "@/lib/format";
import { Arrow } from "@/components/ui/icon";

/** Four-photo grid that opens a native modal <dialog> lightbox. */
export function ProjectGallery({ project }: { project: Project }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const total = project.images.length;

  useEffect(() => {
    const el = dialog.current;
    if (selected !== null) {
      if (!el?.open) el?.showModal();
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
    el?.close();
    returnFocus.current?.focus();
  }, [selected]);

  const move = (direction: number) =>
    setSelected((v) => (v === null ? 0 : (v + direction + total) % total));

  return (
    <>
      <div className="project-gallery-grid">
        {project.images.map((key, i) => (
          <button
            key={key}
            type="button"
            className="gallery-image"
            onClick={(e) => {
              returnFocus.current = e.currentTarget;
              setSelected(i);
            }}
            aria-label={`Enlarge ${project.name} photograph ${i + 1}`}
          >
            <Image
              src={images[key]}
              alt={`${project.name}, architectural view ${i + 1}`}
            />
            <span className="gallery-enlarge">
              <Arrow diagonal />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={project.name + " photo gallery"}
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") move(1);
          if (e.key === "ArrowLeft") move(-1);
        }}
      >
        {selected !== null && (
          <div className="lightbox-inner">
            <div className="lightbox-header">
              <span>{project.name}</span>
              <button
                type="button"
                className="lightbox-close"
                onClick={() => setSelected(null)}
                aria-label="Close photo gallery"
              >
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <Image
              src={images[project.images[selected]]}
              alt={`${project.name}, enlarged architectural view ${selected + 1}`}
              loading="eager"
            />
            <div className="lightbox-footer">
              <span>
                {pad2(selected + 1)} / {pad2(total)}
              </span>
              <span>Photography via Texas Construction Company</span>
              <div>
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Previous photograph"
                >
                  <Arrow left />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Next photograph"
                >
                  <Arrow />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { heroSlides } from "@/content/hero";
import { images } from "@/content/images";
import { projectPath } from "@/content/projects";
import { Arrow } from "@/components/ui/icon";
import { SmartLink } from "@/components/ui/smart-link";

export function HeroGallery() {
  const [active, setActive] = useState(0);
  const slide = heroSlides[active];
  const count = heroSlides.length;
  return (
    <section className="hero-gallery" aria-label="Featured projects">
      {/* Keyed so each slide remounts and replays the fade-in. */}
      <Image
        key={slide.image}
        src={images[slide.image]}
        alt={slide.project.name + " by Texas Construction Company"}
        loading="eager"
        fetchPriority="high"
      />
      <div className="hero-gallery-shade" />
      <div className="hero-gallery-bottom wrap">
        <SmartLink className="hero-project" href={projectPath(slide.project)}>
          <span className="label">
            FEATURED RESIDENCE / {slide.project.place.toUpperCase()}
          </span>
          <span>
            {slide.project.name} <Arrow diagonal />
          </span>
        </SmartLink>
        <div className="slider-controls">
          <span className="slide-index" aria-live="polite">
            0{active + 1} <span>/ 03</span>
          </span>
          <button
            type="button"
            aria-label="Previous featured project"
            onClick={() => setActive((active + count - 1) % count)}
          >
            <Arrow left />
          </button>
          <button
            type="button"
            aria-label="Next featured project"
            onClick={() => setActive((active + 1) % count)}
          >
            <Arrow />
          </button>
        </div>
      </div>
    </section>
  );
}

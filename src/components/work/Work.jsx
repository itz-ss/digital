"use client";

import { useState } from "react";
import workData from "@/data/work.json";
import RevealWrapper from "../UI/RevealWrapper";
import "./style/Work.css";

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeMedia, setActiveMedia] = useState(null);
  const [activeSoundId, setActiveSoundId] = useState(null);

  const filters = ["All", ...workData.projects.map(p => p.label)];

  const projects =
    activeFilter === "All"
      ? workData.projects
      : workData.projects.filter(p => p.label === activeFilter);

  const openModal = (media) => {
    setActiveMedia(media);
    setActiveSoundId(media.id);
  };

  const closeModal = () => {
    setActiveMedia(null);
    setActiveSoundId(null);
  };

  /* ===============================
     YouTube URL → clean embed
  =============================== */
  const toEmbedUrl = (url) => {
    try {
      const u = new URL(url);

      // Shorts
      if (u.pathname.includes("/shorts/")) {
        const id = u.pathname.split("/shorts/")[1];
        return `https://www.youtube-nocookie.com/embed/${id}`;
      }

      // youtube.com/watch?v=
      if (u.searchParams.get("v")) {
        return `https://www.youtube-nocookie.com/embed/${u.searchParams.get("v")}`;
      }

      // youtu.be/
      if (u.hostname.includes("youtu.be")) {
        return `https://www.youtube-nocookie.com/embed${u.pathname}`;
      }

      // already embed
      if (u.pathname.includes("/embed/")) return url;
    } catch { }

    return url;
  };

  /* ===============================
     Media Renderer
  =============================== */
  const renderMedia = (url, mediaId) => {
    const isActive = activeSoundId === mediaId;

    // YouTube / Shorts
    if (url.includes("youtu")) {
      const embed = toEmbedUrl(url);

      return (
        <iframe
          src={`${embed}?autoplay=1&mute=${isActive ? 0 : 1}&controls=${isActive ? 1 : 0}&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3`}
          allow="autoplay; encrypted-media"
          loading="lazy"
          title="Work media"
        />
      );
    }

    // MP4 / Cloudinary
    return (
      <video
        src={url}
        muted={!isActive}
        controls={isActive}
        playsInline
        preload="metadata"
      />
    );
  };

  return (
    <>
      <section className="work">
        <div className="work-container">

          {/* Header */}
          <header className="work-header">
            <RevealWrapper direction="up" delay={240}>
              <h2 className="work-title">Our Work</h2>
            </RevealWrapper>
            <RevealWrapper direction="up" delay={240}>
              <p className="work-intro">
                A selection of reels, videos, and digital experiences built for growth-focused brands.
              </p>
            </RevealWrapper>
          </header>

          {/* Filters */}
          <RevealWrapper direction="up" delay={240}>
            <div className="work-filters">
              {filters.map(filter => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </RevealWrapper>

          {/* Groups */}
          <RevealWrapper direction="up" delay={240}>
            {projects.map(project => (
              <div key={project.id} className="work-group">
                <div className="work-group-header">
                  <div>
                    <RevealWrapper direction="up" delay={240}>
                      <h3>{project.label}</h3>
                    </RevealWrapper>
                    <RevealWrapper direction="up" delay={240}>
                      <p>{project.description}</p>
                    </RevealWrapper>
                  </div>
                </div>

                <div
                  className={`work-row ${project.videos[0]?.type === "reel" ? "reels" : "videos"
                    }`}
                >
                  {project.videos.flatMap(video =>
                    Object.values(video.sources)
                      .flat()
                      .map((url, index) => {
                        const mediaId = `${video.id}-${index}`;

                        return (

                          <div
                            key={mediaId}
                            className={`work-card ${video.type === "reel" ? "reel" : "video"
                              }`}
                            onClick={() =>
                              openModal({
                                id: mediaId,
                                url,
                                type: video.type
                              })
                            }
                          >
                            {renderMedia(url, mediaId)}
                          </div>

                        );
                      })
                  )}
                </div>
              </div>
            ))}
          </RevealWrapper>
        </div>
      </section>

      {/* Modal */}
      {activeMedia && (
        <RevealWrapper direction="up" delay={240}>
          <div className="work-modal" onClick={closeModal}>
            <div
              className="work-modal-content"
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>

              {renderMedia(activeMedia.url, activeMedia.id)}
            </div>
          </div>
        </RevealWrapper>
      )}
    </>
  );
}

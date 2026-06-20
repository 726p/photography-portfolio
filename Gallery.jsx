import React, { useState } from "react";
import useScrollIn from "./useScrollIn";
import { galleryImages, awardImages } from "../data/content";
import Folder from './Folder';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import Plasma from './Plasma';

export default function Gallery() {
  const [foldersRef, foldersAnim] = useScrollIn({ animation: "fadeUp", delay: 100, threshold: 0.1 });
  const [subtitleRef, subtitleAnim] = useScrollIn({ animation: "rotateIn", delay: 200, threshold: 0.1 });
  const [hintRef, hintAnim] = useScrollIn({ animation: "fadeUp", delay: 300, threshold: 0.1 });
  const [selected, setSelected] = useState(null);

  const folderGroups = [
    { title: "视频静帧 · 光影", desc: "从视频作品中提取的静帧画面，记录光影交错的每一帧。", images: [galleryImages[8], galleryImages[9], galleryImages[10]] },
    { title: "日系人像作品", desc: "以日系清新风格捕捉人像的温柔与自然美感。", images: [galleryImages[3], galleryImages[4], galleryImages[7]] },
    { title: "氛围感人像摄影", desc: "通过光影与氛围营造，捕捉人像的情绪与故事感。", images: [{ src: "/images/new1.jpg", category: "个人作品" }, { src: "/images/new2.jpg", category: "个人作品" }, { src: "/images/new3.jpg", category: "个人作品" }] },
  ];

  return (
    <>
      <section id="gallery" className="section gallery">
        <div className="container">
          <h2 className="section-title">个人作品</h2>

          <div className={"gallery__folders-row " + foldersAnim} ref={foldersRef}>
            {folderGroups.map((group, gi) => (
              <div key={gi} className="gallery__folder-col">
                <Folder
                  color="#c0a060"
                  size={2.8}
                  items={group.images.map((img) => (
                    <div
                      onClick={() => setSelected(img)}
                      style={{
                        cursor: "pointer",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        src={img.src}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                />
                <p className="gallery__folder-label"><span style={{display:"block"}}>{group.title}</span><span className="gallery__folder-desc">{group.desc}</span></p>
              </div>
            ))}
          </div>
          <p className={"gallery__folder-hint " + hintAnim} ref={hintRef}>点击文件夹展开查看</p>

          <h3 className={"gallery-subtitle " + subtitleAnim} ref={subtitleRef}>获奖作品与个人短片</h3>
          <div className="gallery-plasma">
            <Plasma
              color="#c0a060"
              speed={0.3}
              direction="forward"
              scale={1.8}
              opacity={0.15}
              mouseInteractive={false}
            />
          </div>
          <ScrollStack
            itemDistance={120}
            itemScale={0.04}
            itemStackDistance={40}
            stackPosition="15%"
            scaleEndPosition="8%"
            baseScale={0.88}
            rotationAmount={0}
            blurAmount={2}
            useWindowScroll={true}
          >
            {awardImages.map((img, i) => (
              <ScrollStackItem key={i}>
                <div className="gallery-card gallery-card--stack" onClick={() => img.link ? window.open(img.link, '_blank') : setSelected(img)}>
                  <img
                    src={img.src}
                    alt={`获奖作品 ${i + 1}`}
                    className="gallery-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="gallery-fallback">图片加载失败</div>
                  <div className="gallery-overlay">
                    <span className="gallery-view">点击查看</span>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      {selected && (
        <div className="gallery-modal" onClick={() => setSelected(null)}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-modal-close" onClick={() => setSelected(null)}>&#10005;</button>
            <img src={selected.src} alt="预览" className="gallery-modal-img" />
            <p className="gallery-modal-cat">{selected.category}</p>
          </div>
        </div>
      )}

      <style>{`
        .gallery { background: var(--color-bg-secondary); }
        .gallery-plasma {
          position: relative;
          width: 100%;
          height: 200px;
          margin-top: -50px;
          margin-bottom: -50px;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .gallery .scroll-stack-scroller {
          height: auto;
          min-height: 80vh;
          overflow: visible;
        }
        .gallery .scroll-stack-inner {
          padding: 0 0 20rem;
          min-height: auto;
        }
        .gallery__folders-row {
          display: flex;
          justify-content: center;
          gap: 200px;
          padding: 60px 0 80px;
        }
        .gallery__folder-col { display: flex; flex-direction: column; align-items: center; }
        .gallery__folder-label {
          font-size: 1.1rem;
          color: var(--color-accent);
          letter-spacing: 3px;
          white-space: nowrap;
          text-align: center;
          margin-top: 120px;
        }
        .gallery__folder-desc { 
          font-size: 0.85rem; 
          color: var(--color-text-muted); 
          letter-spacing: 1px; 
          line-height: 1.8; 
          max-width: 240px; 
          text-align: center;
          display: block;
          margin-top: 18px;
          white-space: normal;
        }
        .gallery__folder-hint {
          text-align: center;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          letter-spacing: 2px;
          margin-bottom: 60px;
          margin-top: 10px;
        }
        .gallery-subtitle { font-size: 1.2rem; font-weight: 400; letter-spacing: 2px; margin-bottom: 40px; color: var(--color-text-muted); }
        .gallery-card {
          position: relative; aspect-ratio: 3/2; overflow: hidden;
          cursor: pointer; border: 1px solid var(--color-border); transition: var(--transition);
        }
        .gallery-card--stack {
          aspect-ratio: 16/9;
          border-radius: 12px;
          width: 100%;
          height: 60vh;
          min-height: 200px;
          max-height: 600px;
        }
        .gallery-card:hover { border-color: var(--color-accent); }
        .gallery-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .gallery-card:hover .gallery-img { transform: scale(1.05); }
        .gallery-fallback {
          display: none; width: 100%; height: 100%; align-items: center; justify-content: center;
          background: var(--color-bg-card); color: var(--color-text-muted); font-size: 0.85rem;
        }
        .gallery-overlay {
          position: absolute; inset: 0; background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center; opacity: 0; transition: var(--transition);
        }
        .gallery-card:hover .gallery-overlay { opacity: 1; }
        .gallery-view {
          font-size: 0.85rem; color: var(--color-accent); letter-spacing: 2px;
          border: 1px solid var(--color-accent); padding: 8px 20px;
        }
        .gallery-modal {
          position: fixed; inset: 0; z-index: 2000; background: rgba(0,0,0,0.9);
          display: flex; align-items: center; justify-content: center; padding: 40px; animation: fadeIn 0.3s ease;
        }
        .gallery-modal-content { position: relative; max-width: 90vw; max-height: 90vh; }
        .gallery-modal-close {
          position: absolute; top: -40px; right: 0; background: none; border: none;
          color: var(--color-text-primary); font-size: 1.5rem; cursor: pointer; padding: 8px; transition: var(--transition);
        }
        .gallery-modal-close:hover { color: var(--color-accent); }
        .gallery-modal-img { max-width: 100%; max-height: 80vh; object-fit: contain; }
        .gallery-modal-cat { text-align: center; margin-top: 14px; color: var(--color-text-muted); font-size: 0.9rem; letter-spacing: 2px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </>
  );
}









































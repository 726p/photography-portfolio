import React from "react";
import useScrollIn from "./useScrollIn";
import { personalInfo, aboutText, stats } from "../data/content";
import PixelTransition from "./PixelTransition";
export default function About() {
  const [leftRef, leftAnim] = useScrollIn({ animation: "scaleIn", delay: 100, threshold: 0.15 });
  const [rightRef, rightAnim] = useScrollIn({ animation: "fadeRight", delay: 200, threshold: 0.15 });
  const [s1Ref, s1Anim] = useScrollIn({ animation: "slideUp", delay: 300, threshold: 0.15 });
  const [s2Ref, s2Anim] = useScrollIn({ animation: "slideUp", delay: 400, threshold: 0.15 });
  const [s3Ref, s3Anim] = useScrollIn({ animation: "slideUp", delay: 500, threshold: 0.15 });
  const [s4Ref, s4Anim] = useScrollIn({ animation: "slideUp", delay: 600, threshold: 0.15 });
  return (
    <>
      <section id="about" className="section about">
        <div className="container">
          <h2 className="section-title">个人经历</h2>
          <div className="about-grid">
            {/* 左侧：头像 + 联系方式 */}
            <div className={"about-left " + leftAnim} ref={leftRef}>
              <div className="about-avatar-wrap">
              <PixelTransition
                firstContent={
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                  />
                }
                secondContent={
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "#111",
                      borderRadius: "50%",
                    }}
                  >
                    <p style={{ fontWeight: 900, fontSize: "2.5rem", color: "#ffffff" }}>
                      {personalInfo.name.charAt(0)}
                    </p>
                  </div>
                }
                gridSize={10}
                pixelColor="#ffffff"
                animationStepDuration={0.4}
                once={false}
                className="about-pixel-card"
              />
              </div>              <p className="about-hover-hint">悬停或点击头像查看效果 ✨</p>              <h3 className="about-name">{personalInfo.name}</h3>
              <p className="about-role">{personalInfo.title}</p>
              <div className="about-contact">
                <a href={`tel:${personalInfo.phone}`} className="about-contact-item">
                  <span className="about-icon">📞</span> {personalInfo.phone}
                </a>
                <a href={`mailto:${personalInfo.email}`} className="about-contact-item">
                  <span className="about-icon">✉️</span> {personalInfo.email}
                </a>
              </div>
            </div>

            {/* 右侧：介绍 + 数据 */}
            <div className={"about-right " + rightAnim} ref={rightRef}>
              <p className="about-text">{aboutText}</p>
              <div className="about-stats">
                {stats.map((s, si) => (
                  <div key={s.label} className={"about-stat-item " + [s1Anim, s2Anim, s3Anim, s4Anim][si]} ref={[s1Ref, s2Ref, s3Ref, s4Ref][si]}>
                    <span className="about-stat-value">{s.value}</span>
                    <span className="about-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about { background: var(--color-bg-secondary); position: relative; }
        .about__light-rays { position: absolute; inset: 0; z-index: 0; }
        .about-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1.5fr; gap: 80px; align-items: start; }
        .about-left { text-align: center; }

        .about-pixel-card {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 2px solid var(--color-border);
          overflow: hidden;
        }
        .about-avatar-wrap {
          width: 220px; height: 220px; border-radius: 50%; overflow: hidden;
          margin: 0 auto 24px; border: 2px solid var(--color-border); position: relative;
        }
        .about-avatar { width: 100%; height: 100%; object-fit: cover; }
        .about-avatar-fallback {
          display: none; width: 100%; height: 100%; background: var(--color-bg-card);
          align-items: center; justify-content: center; font-size: 4rem; color: var(--color-text-muted);
        }
        .about-name { font-size: 1.6rem; font-weight: 500; letter-spacing: 2px; margin-bottom: 8px; }
        .about-hover-hint {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          letter-spacing: 1px;
          margin-top: 8px;
          margin-bottom: 12px;
          opacity: 0.7;
          transition: var(--transition);
        }
        .about-hover-hint:hover {
          opacity: 1;
          color: var(--color-accent);
        }
        .about-role { font-size: 0.9rem; color: var(--color-accent); letter-spacing: 2px; margin-bottom: 24px; }
        .about-contact { display: flex; flex-direction: column; gap: 12px; }
        .about-contact-item {
          font-size: 0.9rem; color: var(--color-text-secondary); letter-spacing: 1px; transition: var(--transition);
        }
        .about-contact-item:hover { color: var(--color-accent); }
        .about-icon { margin-right: 8px; }
        .about-text {
          font-size: 1.05rem; color: var(--color-text-secondary);
          line-height: 2; letter-spacing: 1px; margin-bottom: 40px; white-space: pre-line;
        }
        .about-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
        .about-stat-item {
          text-align: center; padding: 24px 16px; border: 1px solid var(--color-border); transition: var(--transition);
        }
        .about-stat-item:hover { border-color: var(--color-accent); transform: translateY(-4px); }
        .about-stat-value { display: block; font-size: 1.8rem; font-weight: 300; color: var(--color-accent); margin-bottom: 8px; }
        .about-stat-label { font-size: 0.8rem; color: var(--color-text-muted); letter-spacing: 1px; }
      `}</style>
    </>
  );
}












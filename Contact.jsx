import React from "react";
import useScrollIn from "./useScrollIn";
import { personalInfo } from "../data/content";
import Plasma from "./Plasma";

export default function Contact() {
  const [titleRef, titleAnim] = useScrollIn({ animation: "scaleIn", delay: 100, threshold: 0.15 });
  const [subtitleRef, subtitleAnim] = useScrollIn({ animation: "fadeLeft", delay: 200, threshold: 0.15 });
  const [infoRef, infoAnim] = useScrollIn({ animation: "fadeRight", delay: 300, threshold: 0.15 });
  const [socialRef, socialAnim] = useScrollIn({ animation: "slideUp", delay: 400, threshold: 0.15 });
  const [footerRef, footerAnim] = useScrollIn({ animation: "rotateIn", delay: 500, threshold: 0.15 });
  return (
    <>
      <section id="contact" className="contact">
        <div className="contact-plasma">
          <Plasma
            color="#c0a060"
            speed={0.4}
            direction="forward"
            scale={1.5}
            opacity={0.3}
            mouseInteractive={true}
          />
        </div>
        <div className="contact-lines">
          <div className="contact-line" />
          <div className="contact-line" />
          <div className="contact-line" />
        </div>
        <div className="container contact-content">
          <h2 className={"contact-title " + titleAnim} ref={titleRef}>保持联系</h2>
          <p className={"contact-subtitle " + subtitleAnim} ref={subtitleRef}>如果你有拍摄需求或合作意向，欢迎随时联系</p>
          <div className={"contact-info " + infoAnim} ref={infoRef}>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <a href={"tel:" + personalInfo.phone} className="contact-value">{personalInfo.phone}</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <a href={"mailto:" + personalInfo.email} className="contact-value">{personalInfo.email}</a>
            </div>
          </div>
          <div className={"contact-social " + socialAnim} ref={socialRef}>
          </div>
          <div className={"contact-footer " + footerAnim} ref={footerRef}>
            <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </section>

      <style>{`
        .contact {
          position: relative; width: 100%; height: 100vh; min-height: 600px;
          display: flex; align-items: center;
          background: linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg) 100%);
          overflow: hidden;
        }
        .contact-plasma {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .contact-lines {
          position: absolute; inset: 0; display: flex; justify-content: space-around; pointer-events: none; z-index: 1;
        }
        .contact-line {
          width: 1px; height: 100%;
          background: linear-gradient(180deg, transparent 0%, var(--color-border) 30%, var(--color-border) 70%, transparent 100%);
        }
        .contact-content {
          position: relative; z-index: 2; width: 100%; text-align: center;
          display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100%;
        }
        .contact-title {
          font-size: 3rem; font-weight: 200; letter-spacing: 8px; margin-bottom: 20px;
        }
        .contact-title::after {
          content: ""; display: block; width: 60px; height: 2px;
          background: var(--color-accent); margin: 20px auto 0;
        }
        .contact-subtitle {
          font-size: 1.05rem; color: var(--color-text-secondary);
          letter-spacing: 2px; margin-bottom: 60px; 
        }
        .contact-info { display: flex; gap: 60px; justify-content: center; margin-bottom: 60px;  }
        .contact-item { display: flex; align-items: center; gap: 12px; }
        .contact-icon { font-size: 1.3rem; }
        .contact-value { font-size: 1.1rem; letter-spacing: 2px; transition: var(--transition); }
        .contact-value:hover { color: var(--color-accent); }
        .contact-social { margin-bottom: 60px;  }
        .contact-social-label { display: block; font-size: 0.85rem; color: var(--color-text-muted); letter-spacing: 2px; margin-bottom: 16px; }
        .contact-social-text { font-size: 0.85rem; color: var(--color-text-muted); letter-spacing: 1px; }
        .contact-footer { font-size: 0.8rem; color: var(--color-text-muted); letter-spacing: 1px;  }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}





import React from "react";
import Silk from "./Silk";
import BlurText from "./BlurText";

export default function Hero() {
  return (
    <>
      <section id="hero" className="hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-silk">
            <Silk
              speed={5}
              scale={1}
              color="#7B7481"
              noiseIntensity={1.5}
              rotation={0}
            />
          </div>
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <p className="hero-greeting">你好，我是</p>
          <h1 className="hero-title" style={{ minHeight: "1.2em", display: "flex", justifyContent: "center", width: "100%" }}><BlurText text="彭基良" delay={300} animateBy="words" direction="top" /></h1>
          <p className="hero-subtitle">摄影师 / 导演 / 视觉创作者</p>
          <p className="hero-tagline">用镜头讲述每一个值得铭记的故事</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn--filled">查看作品</a>
            <a href="#contact" className="btn">联系我</a>
          </div>
        </div>
        <div className="hero-scroll">
          <span>向下滚动</span>
          <div className="hero-scroll-line" />
        </div>
      </section>

      <style>{`
        .hero {
          position: relative; width: 100%; height: 100vh;
          display: flex; align-items: center; justify-content: center; overflow: hidden;
        }
        .hero-bg { position: absolute; inset: 0; z-index: 0; }
        .hero-gradient {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a0a 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
          opacity: 0.4;
        }
        .hero-silk {
          position: absolute; inset: 0;
          opacity: 0.7;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .hero-overlay {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%);
        }
        .hero-content { position: relative; z-index: 1; text-align: center; }
        .hero-greeting {
          font-size: 1.1rem; color: var(--color-accent); letter-spacing: 4px;
          margin-bottom: 20px; animation: fadeUp 0.8s ease;
        }
        .hero-title {
          font-size: 4.5rem; font-weight: 200; letter-spacing: 8px;
          margin-bottom: 16px; line-height: 1.2; animation: fadeUp 0.8s ease 0.2s both;
        }
        .hero-subtitle {
          font-size: 1.3rem; color: var(--color-text-secondary);
          letter-spacing: 6px; margin-bottom: 12px; animation: fadeUp 0.8s ease 0.4s both;
        }
        .hero-tagline {
          font-size: 1rem; color: var(--color-text-muted);
          letter-spacing: 2px; margin-bottom: 40px; animation: fadeUp 0.8s ease 0.6s both;
        }
        .hero-actions {
          display: flex; gap: 20px; justify-content: center; animation: fadeUp 0.8s ease 0.8s both;
        }
        .hero-scroll {
          position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
          z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;
          animation: fadeUp 0.8s ease 1.2s both;
        }
        .hero-scroll span { font-size: 0.75rem; color: var(--color-text-muted); letter-spacing: 2px; }
        .hero-scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, var(--color-accent), transparent);
          animation: scrollPulse 2s ease infinite;
        }
        @keyframes scrollPulse {
          0% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.5; transform: scaleY(0.6); }
          100% { opacity: 1; transform: scaleY(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}




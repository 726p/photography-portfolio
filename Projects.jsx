import React from "react";
import useScrollIn from "./useScrollIn";
import { experiences, honors } from "../data/content";

export default function Projects() {
  const [h1Ref, h1Anim] = useScrollIn({ animation: "flipIn", delay: 400, threshold: 0.15 });
  const [h2Ref, h2Anim] = useScrollIn({ animation: "flipIn", delay: 500, threshold: 0.15 });
  const [card1Ref, card1Anim] = useScrollIn({ animation: "fadeLeft", delay: 100, threshold: 0.15 });
  const [card2Ref, card2Anim] = useScrollIn({ animation: "fadeRight", delay: 200, threshold: 0.15 });
  const [honorsRef, honorsAnim] = useScrollIn({ animation: "slideUp", delay: 300, threshold: 0.15 });
  return (
    <>
      <section id="projects" className="section projects">
        <div className="container">
          <h2 className="section-title">实习经历</h2>
          <div className="experiences-list">
            {experiences.map((p, i) => (
              <div key={p.id} className={"experience-card " + (i === 0 ? card1Anim : card2Anim)} ref={i === 0 ? card1Ref : card2Ref}>
                <div className="exp-num"><span>0{i + 1}</span></div>
                <div className="exp-info">
                  <p className="exp-period">{p.period}</p>
                  <h3 className="exp-title">{p.title}</h3>
                  <p className="exp-desc">{p.description}</p>
                  <ul className="exp-tags">
                    {p.achievements.map((a, j) => (
                      <li key={j} className="exp-tag">{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className={"exp-honors " + honorsAnim} ref={honorsRef}>
            <h3 className="exp-honors-title">荣誉奖项</h3>
            <div className="exp-honors-list">
              {honors.map((h, i) => (
                <div key={i} className={"exp-honor-item " + (i === 0 ? h1Anim : h2Anim)} ref={i === 0 ? h1Ref : h2Ref}>
                  <span className="exp-honor-icon">🏆</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .experiences-list { display: flex; flex-direction: column; gap: 60px; margin-bottom: 80px; }
        .experience-card {
          display: grid; grid-template-columns: 80px 1fr; gap: 40px;
          padding: 40px; border: 1px solid var(--color-border); transition: var(--transition);
        }
        .experience-card:hover { border-color: var(--color-accent); background: rgba(192,160,96,0.03); }
        .exp-num { font-size: 3rem; font-weight: 700; color: var(--color-border); line-height: 1; }
        .exp-num span { position: sticky; top: 100px; }
        .exp-period { font-size: 0.85rem; color: var(--color-accent); letter-spacing: 2px; margin-bottom: 12px; }
        .exp-title { font-size: 1.5rem; font-weight: 500; letter-spacing: 2px; margin-bottom: 20px; }
        .exp-desc { font-size: 0.95rem; color: var(--color-text-secondary); line-height: 1.8; margin-bottom: 24px; }
        .exp-tags { display: flex; flex-wrap: wrap; gap: 12px; }
        .exp-tag {
          font-size: 0.85rem; color: var(--color-text-secondary);
          padding: 6px 16px; border: 1px solid var(--color-border); border-radius: 20px; letter-spacing: 1px;
        }
        .exp-tag:hover { border-color: var(--color-accent); color: var(--color-accent); }
        .exp-honors { padding-top: 60px; border-top: 1px solid var(--color-border); }
        .exp-honors-title { font-size: 1.2rem; font-weight: 400; letter-spacing: 2px; margin-bottom: 24px; color: var(--color-text-muted); }
        .exp-honors-list { display: flex; flex-direction: column; gap: 16px; min-height: 150px; }
        .exp-honor-item {
          display: flex; align-items: center; gap: 12px;
          font-size: 0.95rem; color: var(--color-text-secondary); letter-spacing: 1px;
        }
        .exp-honor-icon { font-size: 1.2rem; }
      `}</style>
    </>
  );
}















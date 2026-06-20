import React, { useState, useEffect } from "react";

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "经历", href: "#about" },
  { label: "项目", href: "#projects" },
  { label: "作品", href: "#gallery" },
  { label: "联系", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container navbar-inner">
          <a href="#hero" className="navbar-logo" onClick={(e) => scrollTo(e, "#hero")}>
            彭基良
          </a>
          <ul className="navbar-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={(e) => scrollTo(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn navbar-btn" onClick={(e) => scrollTo(e, "#contact")}>
            联系我
          </a>
        </div>
      </nav>

      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: var(--nav-height); display: flex; align-items: center;
          transition: var(--transition); background: transparent;
        }
        .navbar.scrolled {
          background: rgba(10,10,10,0.95); backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--color-border);
        }
        .navbar-inner {
          display: flex; align-items: center; justify-content: space-between; width: 100%;
        }
        .navbar-logo {
          font-size: 1.2rem; font-weight: 600; letter-spacing: 2px;
        }
        .navbar-links { display: flex; gap: 40px; }
        .navbar-links a {
          font-size: 0.9rem; color: var(--color-text-secondary);
          letter-spacing: 1px; transition: var(--transition); position: relative;
        }
        .navbar-links a::after {
          content: ""; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 1px; background: var(--color-accent); transition: var(--transition);
        }
        .navbar-links a:hover { color: var(--color-text-primary); }
        .navbar-links a:hover::after { width: 100%; }
        .navbar-btn { padding: 8px 24px; font-size: 0.85rem; }
      `}</style>
    </>
  );
}


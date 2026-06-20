import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Dock from "./components/Dock";

const scrollTo = (id) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const dockItems = [
  { icon: "🏠", label: "首页", onClick: () => scrollTo("#hero") },
  { icon: "👤", label: "经历", onClick: () => scrollTo("#about") },
  { icon: "💼", label: "项目", onClick: () => scrollTo("#projects") },
  { icon: "🖼️", label: "作品", onClick: () => scrollTo("#gallery") },
  { icon: "📬", label: "联系", onClick: () => scrollTo("#contact") },
];

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Gallery />
      </main>
      <Contact />
      <Dock
        items={dockItems}
        panelHeight={60}
        baseItemSize={44}
        magnification={64}
        distance={150}
      />
    </>
  );
}

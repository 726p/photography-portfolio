import React, { useMemo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import "./OrbitImages.css";

function generateEllipsePath(cx, cy, rx, ry) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function generateCirclePath(cx, cy, r) {
  return generateEllipsePath(cx, cy, r, r);
}

function generateSquarePath(cx, cy, size) {
  const h = size / 2;
  return `M ${cx - h} ${cy - h} L ${cx + h} ${cy - h} L ${cx + h} ${cy + h} L ${cx - h} ${cy + h} Z`;
}

function generateRectanglePath(cx, cy, w, h) {
  const hw = w / 2;
  const hh = h / 2;
  return `M ${cx - hw} ${cy - hh} L ${cx + hw} ${cy - hh} L ${cx + hw} ${cy + hh} L ${cx - hw} ${cy + hh} Z`;
}

function generateTrianglePath(cx, cy, size) {
  const height = (size * Math.sqrt(3)) / 2;
  const hs = size / 2;
  return `M ${cx} ${cy - height / 1.5} L ${cx + hs} ${cy + height / 3} L ${cx - hs} ${cy + height / 3} Z`;
}

function generateStarPath(cx, cy, outerR, innerR, points) {
  const step = Math.PI / points;
  let path = "";
  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }
  return path + " Z";
}

function generateHeartPath(cx, cy, size) {
  const s = size / 30;
  return `M ${cx} ${cy + 12 * s} C ${cx - 20 * s} ${cy - 5 * s}, ${cx - 12 * s} ${cy - 18 * s}, ${cx} ${cy - 8 * s} C ${cx + 12 * s} ${cy - 18 * s}, ${cx + 20 * s} ${cy - 5 * s}, ${cx} ${cy + 12 * s}`;
}

function generateInfinityPath(cx, cy, w, h) {
  const hw = w / 2;
  const hh = h / 2;
  return `M ${cx - hw} ${cy - hh / 2} C ${cx - hw / 2} ${cy - hh}, ${cx + hw / 2} ${cy - hh}, ${cx + hw} ${cy - hh / 2} C ${cx + hw + hw / 4} ${cy}, ${cx + hw / 2} ${cy + hh / 4}, ${cx} ${cy} C ${cx - hw / 2} ${cy - hh / 4}, ${cx - hw - hw / 4} ${cy}, ${cx - hw} ${cy + hh / 2} C ${cx - hw / 2} ${cy + hh}, ${cx + hw / 2} ${cy + hh}, ${cx + hw} ${cy + hh / 2}`;
}

function generateWavePath(cx, cy, w, h, cycles) {
  let path = `M ${cx - w / 2} ${cy}`;
  for (let i = 1; i <= cycles * 2; i++) {
    const t = (i / (cycles * 2)) * w - w / 2;
    const x = cx + t;
    const y = cy + (i % 2 === 0 ? -h / 2 : h / 2);
    path += ` L ${x} ${y}`;
  }
  return path;
}

function OrbitItem({ item, index, totalItems, path, itemSize, rotation, progress, fill }) {
  const length = useMotionValue(0);

  useEffect(() => {
    const updateLength = () => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", path);
      svg.appendChild(p);
      document.body.appendChild(svg);
      const len = p.getTotalLength();
      document.body.removeChild(svg);
      length.set(len);
    };
    updateLength();
  }, [path, length]);

  const rawOffset = fill ? index / totalItems : Math.random();
  const offset = useMemo(() => rawOffset, [rawOffset]);

  const motionProgress = useTransform(progress, [0, 100], [0, 1]);

  const x = useTransform(motionProgress, (latest) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", path);
    svg.appendChild(p);
    document.body.appendChild(svg);
    const len = p.getTotalLength();
    const adjusted = ((latest + offset) % 1 + 1) % 1;
    const point = p.getPointAtLength(adjusted * len);
    document.body.removeChild(svg);
    return point.x - itemSize / 2;
  });

  const y = useTransform(motionProgress, (latest) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", path);
    svg.appendChild(p);
    document.body.appendChild(svg);
    const len = p.getTotalLength();
    const adjusted = ((latest + offset) % 1 + 1) % 1;
    const point = p.getPointAtLength(adjusted * len);
    document.body.removeChild(svg);
    return point.y - itemSize / 2;
  });

  return React.createElement(
    motion.div,
    {
      className: "orbit-item",
      style: { width: itemSize, height: itemSize, x, y, cursor: "pointer" },
      onClick: () => onImageClick && onImageClick(index),
    },
    React.cloneElement(item, { style: { width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" } })
  );
}

export default function OrbitImages({
  images = [],
  altPrefix = "Orbiting image",
  shape = "ellipse",
  customPath,
  baseWidth = 1400,
  radiusX = 700,
  radiusY = 170,
  radius = 300,
  starPoints = 5,
  starInnerRatio = 0.5,
  rotation = -8,
  duration = 40,
  itemSize = 64,
  direction = "normal",
  fill = true,
  width = "100%",
  height = "auto",
  className = "",
  showPath = false,
  pathColor = "rgba(0,0,0,0.1)",
  pathWidth = 2,
  easing = "linear",
  paused = false,
  centerContent,
  responsive = false,
  onImageClick,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(null);
  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  const path = useMemo(() => {
    switch (shape) {
      case "ellipse":
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
      case "circle":
        return generateCirclePath(designCenterX, designCenterY, radius);
      case "square":
        return generateSquarePath(designCenterX, designCenterY, radius * 2);
      case "rectangle":
        return generateRectanglePath(designCenterX, designCenterY, radiusX * 2, radiusY * 2);
      case "triangle":
        return generateTrianglePath(designCenterX, designCenterY, radius * 2);
      case "star":
        return generateStarPath(designCenterX, designCenterY, radius, radius * starInnerRatio, starPoints);
      case "heart":
        return generateHeartPath(designCenterX, designCenterY, radius * 2);
      case "infinity":
        return generateInfinityPath(designCenterX, designCenterY, radiusX * 2, radiusY * 2);
      case "wave":
        return generateWavePath(designCenterX, designCenterY, radiusX * 2, radiusY, 3);
      case "custom":
        return customPath || generateCirclePath(designCenterX, designCenterY, radius);
      default:
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
    }
  }, [shape, customPath, designCenterX, designCenterY, radiusX, radiusY, radius, starPoints, starInnerRatio]);

  useLayoutEffect(() => {
    if (!responsive || !containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.clientWidth / baseWidth);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [responsive, baseWidth]);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (paused) return;
    const controls = animate(progress, direction === "reverse" ? -100 : 100, {
      duration,
      ease: easing,
      repeat: Infinity,
      repeatType: "loop",
    });
    return () => controls.stop();
  }, [progress, duration, easing, direction, paused]);

  const containerWidth = responsive ? "100%" : typeof width === "number" ? width : "100%";
  const containerHeight = responsive ? "auto" : typeof height === "number" ? height : typeof width === "number" ? width : "auto";

  const items = images.map((src, index) =>
    React.createElement("img", {
      key: src,
      src,
      alt: `${altPrefix} ${index + 1}`,
      draggable: false,
      className: "orbit-image",
    })
  );

  return React.createElement(
    "div",
    {
      ref: containerRef,
      className: `orbit-container ${className}`,
      style: { width: containerWidth, height: containerHeight, aspectRatio: responsive ? "1 / 1" : undefined },
      "aria-hidden": "true",
    },
    React.createElement(
      "div",
      {
        className: responsive ? "orbit-scaling-container orbit-scaling-container--responsive" : "orbit-scaling-container",
        style: {
          width: responsive ? baseWidth : "100%",
          height: responsive ? baseWidth : "100%",
          transform: responsive && scale !== null ? `translate(-50%, -50%) scale(${scale})` : undefined,
          visibility: responsive && scale === null ? "hidden" : undefined,
        },
      },
      React.createElement(
        "div",
        {
          className: "orbit-rotation-wrapper",
          style: { transform: `rotate(${rotation}deg)` },
        },
        showPath &&
          React.createElement(
            "svg",
            {
              width: "100%",
              height: "100%",
              viewBox: `0 0 ${baseWidth} ${baseWidth}`,
              className: "orbit-path-svg",
            },
            React.createElement("path", {
              d: path,
              fill: "none",
              stroke: pathColor,
              strokeWidth: pathWidth / (scale ?? 1),
            })
          ),
        items.map((item, index) =>
          React.createElement(OrbitItem, {
            key: index,
            item,
            index,
            totalItems: items.length,
            path,
            itemSize,
            rotation,
            progress,
            fill,
          })
        )
      )
    ),
    centerContent &&
      React.createElement("div", { className: "orbit-center-content" }, centerContent)
  );
}



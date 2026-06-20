import { useEffect, useRef, useState } from "react";

/**
 * 通用的滚动入场动画 Hook
 * @param {Object} options
 * @param {string} options.animation - 动画类型: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleIn" | "slideUp" | "rotateIn" | "flipIn"
 * @param {number} options.delay - 延迟（毫秒）
 * @param {number} options.threshold - 可见比例阈值
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export default function useScrollIn({ animation = "fadeUp", delay = 0, threshold = 0.1 } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 如果动画已触发过，不再重复触发
    if (isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, isVisible]);

  const animationClass = isVisible ? `animate-${animation} visible` : `animate-${animation}`;

  return [ref, animationClass, isVisible];
}

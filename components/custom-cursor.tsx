'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      // Dot follows cursor immediately via CSS transform (no re-render)
      dot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
    };

    const onMouseEnter = () => { isHoveringRef.current = true; };
    const onMouseLeave = () => { isHoveringRef.current = false; };

    // Smooth ring follows cursor via rAF loop (no React state)
    const animate = () => {
      const lerp = 0.15;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

      const scale = isHoveringRef.current ? 1.5 : 1;
      ring.style.transform = `translate(${posRef.current.x - 16}px, ${posRef.current.y - 16}px) scale(${scale})`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    document.addEventListener('mousemove', onMouseMove, { passive: true });

    // Delegated hover detection — no per-element listeners
    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as Element;
      if (target.closest('button, a, [role="button"]')) onMouseEnter();
    };
    const onPointerOut = (e: PointerEvent) => {
      const target = e.relatedTarget as Element | null;
      if (!target?.closest('button, a, [role="button"]')) onMouseLeave();
    };

    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Cursor ring — uses will-change for GPU layer */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full mix-blend-difference z-50 pointer-events-none"
        style={{
          backgroundColor: 'hsl(var(--primary))',
          willChange: 'transform',
          transition: 'opacity 0.2s',
        }}
      />
      {/* Cursor dot — instant follow */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1 h-1 rounded-full z-50 pointer-events-none"
        style={{
          backgroundColor: 'hsl(var(--primary))',
          willChange: 'transform',
        }}
      />
    </>
  );
}
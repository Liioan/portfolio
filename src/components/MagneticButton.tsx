import { useRef, type ReactNode, useEffect, useState } from "react";
import { TweenMax, Power4 } from "gsap";

interface MagneticButtonProps {
  className?: string;
  children: ReactNode;
}

const MagneticButton = ({ className = "", children }: MagneticButtonProps) => {
  const buttonRef = useRef<any>();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const onResize = () => {
    setIsMobile(window.innerWidth < 640);
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const strength = 50;
    buttonRef.current.addEventListener("mousemove", (e: MouseEvent) => {
      if (isMobile) return;
      const magnetButton = buttonRef.current;
      const bounding = magnetButton?.getBoundingClientRect();

      TweenMax.to(magnetButton, 1, {
        x:
          ((e.clientX - bounding.left) / magnetButton?.offsetWidth - 0.5) *
          strength,
        y:
          ((e.clientY - bounding.top) / magnetButton?.offsetHeight - 0.5) *
          strength,
        ease: Power4.easeOut,
      });
    });
    buttonRef.current.addEventListener("mouseout", (e: Event) => {
      if (isMobile) return;
      TweenMax.to(e.currentTarget, 1, { x: 0, y: 0, ease: Power4.easeOut });
    });
  });

  return (
    <button className={`magnet ${className}`} ref={buttonRef}>
      {children}
    </button>
  );
};

export default MagneticButton;

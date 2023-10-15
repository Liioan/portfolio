import { useRef, type ReactNode, useEffect } from "react";
import { TweenMax, Power4 } from "gsap";

interface MagneticButtonProps {
  className?: string;
  children: ReactNode;
}

const MagneticButton = ({ className = "", children }: MagneticButtonProps) => {
  const buttonRef = useRef<any>();

  useEffect(() => {
    const strength = 50;
    buttonRef.current.addEventListener("mousemove", (e: MouseEvent) => {
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

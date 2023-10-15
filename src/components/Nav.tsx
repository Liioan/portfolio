import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";

const anchors = ["about", "toolbox", "projects", "contact"];

const Nav = () => {
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

  return (
    <nav className="fixed left-0 top-0 z-20 flex w-full justify-between p-[30px]">
      <img src="/logo.png" alt="" className="h-[67px] w-[67px]" />
      <ul className="flex w-min flex-col justify-end">
        {anchors.map((anchor) => (
          <li className="hide-cursor flex w-full justify-end text-[32px] font-semibold text-white opacity-50 transition-opacity duration-200 hover:opacity-100">
            <MagneticButton>
              <a href={`#${anchor}`}>{anchor}</a>
            </MagneticButton>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;

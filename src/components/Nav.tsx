import { ChevronDown, Menu } from "lucide-react";
import { useEffect, useState, type SetStateAction, type Dispatch } from "react";
import MagneticButton from "./MagneticButton";
import { AnimatePresence, motion } from "framer-motion";

const anchors = ["about", "toolbox", "projects", "contact"];

const DesktopNav = () => {
  return (
    <ul className="flex w-min flex-col justify-end">
      {anchors.map((anchor) => (
        <li
          key={anchor}
          className="hide-cursor flex w-full justify-end text-[32px] font-semibold text-white opacity-50 transition-opacity duration-200 hover:opacity-100"
        >
          <MagneticButton>
            <a href={`#${anchor}`}>{anchor}</a>
          </MagneticButton>
        </li>
      ))}
    </ul>
  );
};

interface NavButtonProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavButton = ({ isOpen, setIsOpen }: NavButtonProps) => {
  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="relative h-12 w-12"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 top-0"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            <ChevronDown size={48} color="white" />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          className="absolute left-0 top-0"
          animate={{
            y: isOpen ? -10 : 0,
            opacity: isOpen ? 0.5 : 1,
            scale: isOpen ? 0.5 : 1,
          }}
        >
          <Menu size={48} color="white" />
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return <NavButton isOpen={isOpen} setIsOpen={setIsOpen} />;
};

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
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </nav>
  );
};

export default Nav;

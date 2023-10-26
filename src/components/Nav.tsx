import { ChevronDown, Menu } from "lucide-react";
import { useEffect, useState, type SetStateAction, type Dispatch } from "react";
import MagneticButton from "./MagneticButton";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "../utils/lenis";

const anchors = ["about", "toolbox", "projects", "contact"];

interface AnchorProps {
  text: string;
  iteration: number;
}

const Anchor = ({ text, iteration }: AnchorProps) => {
  const { lenis } = useLenis();

  return (
    <motion.li
      className="hide-cursor flex w-full justify-end text-[32px] font-semibold text-white opacity-50 transition-opacity duration-200 hover:opacity-100"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 0.5, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 * iteration, ease: "backOut" }}
    >
      <MagneticButton>
        <a
          href={`#${text}`}
          onClick={() => {
            lenis.scrollTo(`#${text}`);
          }}
        >
          {text}
        </a>
      </MagneticButton>
    </motion.li>
  );
};

const DesktopNav = () => {
  return (
    <ul className="flex w-min flex-col justify-end">
      {anchors.map((anchor, i) => (
        <Anchor text={anchor} iteration={i + 1} key={anchor} />
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
      className="relative flex h-12 w-12 items-center justify-center"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-20"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
          >
            <ChevronDown size={32} color="#26C9DF" />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          className="absolute z-10"
          animate={{
            y: isOpen ? -10 : 0,
            opacity: isOpen ? 0.5 : 1,
            scale: isOpen ? 0.5 : 1,
          }}
        >
          <Menu size={32} color="#888" />
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <NavButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute right-0 flex w-min flex-col justify-end rounded-[20px] bg-background px-6 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {anchors.map((anchor, i) => (
              <Anchor iteration={i} key={anchor} text={anchor} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
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
    <nav className="fixed left-0 top-0 z-20 flex w-full items-center justify-between p-[30px] sm:items-start">
      <motion.img
        src="/logo.png"
        alt=""
        className="h-[47px] w-[47px] sm:h-[67px] sm:w-[67px]"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "backOut" }}
      />
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </nav>
  );
};

export default Nav;

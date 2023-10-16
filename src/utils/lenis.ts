import Lenis from "@studio-freight/lenis";

export const useLenis = () => {
  const lenis = new Lenis();

  function raf(time: any) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return { lenis };
};

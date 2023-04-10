"use client";

import React from "react";
import bg1 from "../../public/bg-1.jpg";
import bg2 from "../../public/bg-2.jpg";
import bg3 from "../../public/bg-3.jpg";
import bg4 from "../../public/bg-4.jpg";
import bg5 from "../../public/bg-5.jpg";
import useScrollTo from "react-spring-scroll-to-hook";
import { useScrollDirection } from "react-use-scroll-direction";
import { Inter } from "next/font/google";
import { config, animated, SpringValue, useSpringValue } from "react-spring";
import Image, { StaticImageData } from "next/image";

const inter = Inter({ subsets: ["latin"] });

type UseScrollSnapProp = {
  padding: number;
};

function useScrollSnap({ padding }: UseScrollSnapProp) {
  const [isSnapDisabled, setIsSnapDisabled] = React.useState(false);
  const { scrollTo } = useScrollTo(config.gentle);
  const { isScrollingUp, isScrollingDown } = useScrollDirection();

  const handleScrollToSection = React.useCallback(
    (sectionPosition: number) => {
      setIsSnapDisabled(true);
      scrollTo(sectionPosition);
      setTimeout(() => setIsSnapDisabled(false), 500);
    },
    [scrollTo]
  );

  // Scroll to next section
  React.useEffect(() => {
    if (isSnapDisabled) return;

    const shouldScrollToNext =
      window &&
      window.scrollY % window.innerHeight > window.innerHeight - padding;

    if (shouldScrollToNext) {
      scrollTo(
        window.innerHeight * Math.ceil(window.scrollY / window.innerHeight)
      );
    }
  }, [isScrollingUp, isSnapDisabled, padding, scrollTo]);

  // Scroll to prev section
  React.useEffect(() => {
    if (isSnapDisabled) return;

    const shouldScrollToPrev =
      window && window.scrollY % window.innerHeight < padding;

    if (shouldScrollToPrev) {
      scrollTo(
        window.innerHeight * Math.floor(window.scrollY / window.innerHeight)
      );
    }
  }, [isScrollingDown, isSnapDisabled, padding, scrollTo]);

  return { handleScrollToSection };
}

export default function Home() {
  const { handleScrollToSection } = useScrollSnap({
    padding: 400,
  });

  return (
    <div className="w-full h-full relative text-white">
      <header className="z-50 fixed top-0 h-24 w-full flex justify-between items-center px-20 bg-opacity-0">
        <div>LOGO</div>
        <nav className="flex gap-x-20">
          <a onClick={() => handleScrollToSection(window?.innerHeight * 0)}>
            Home
          </a>
          <a onClick={() => handleScrollToSection(window?.innerHeight * 1)}>
            Contacts
          </a>
        </nav>
      </header>
      <main className="relative snap-y flex w-full flex-col items-center">
        <Card
          id="card-1"
          zIndex="z-10"
          bgImage={bg1}
          yStartPosition={0 * window?.innerHeight}
          yEndPosition={1 * window?.innerHeight}
        >
          {(scrollAnimationProgress) => (
            <animated.div
              className="radial-progress"
              style={{ "--value": scrollAnimationProgress }}
            ></animated.div>
          )}
        </Card>
        <Card
          id="card-2"
          zIndex="z-20"
          bgImage={bg2}
          yStartPosition={1 * window?.innerHeight}
          yEndPosition={2 * window?.innerHeight}
        >
          {(scrollAnimationProgress) => (
            <animated.div
              className="radial-progress"
              style={{ "--value": scrollAnimationProgress }}
            ></animated.div>
          )}
        </Card>
        <Card
          id="card-3"
          zIndex="z-30"
          bgImage={bg3}
          yStartPosition={2 * window?.innerHeight}
          yEndPosition={3 * window?.innerHeight}
        >
          {(scrollAnimationProgress) => (
            <animated.div
              className="radial-progress"
              style={{ "--value": scrollAnimationProgress }}
            ></animated.div>
          )}
        </Card>
        <Card
          id="card-4"
          zIndex="z-40"
          bgImage={bg4}
          yStartPosition={3 * window?.innerHeight}
          yEndPosition={4 * window?.innerHeight}
        >
          {(scrollAnimationProgress) => (
            <animated.div
              className="radial-progress"
              style={{ "--value": scrollAnimationProgress }}
            ></animated.div>
          )}
        </Card>
        <Card
          id="card-5"
          zIndex="z-50"
          bgImage={bg5}
          yStartPosition={4 * window?.innerHeight}
          yEndPosition={5 * window?.innerHeight}
        >
          {(scrollAnimationProgress) => (
            <animated.div
              className="radial-progress"
              style={{ "--value": scrollAnimationProgress }}
            ></animated.div>
          )}
        </Card>
      </main>
      <footer className="shadow-inner h-52 w-full bg-slate-700 flex items-center justify-center px-20">
        <h1 className="text-6xl font-bold">Footer</h1>
      </footer>
    </div>
  );
}

type CardProp = {
  id: string;
  bgImage: StaticImageData;
  zIndex: string;
  yStartPosition: number;
  yEndPosition: number;
  children: (scrollAnimationProgress: SpringValue<number>) => React.ReactNode;
};

function Card(props: CardProp) {
  const { id, bgImage, zIndex, children, yStartPosition, yEndPosition } = props;

  const scrollAnimationProgress = useScrollAnimationProgress(
    yStartPosition,
    yEndPosition
  );

  return (
    <section
      id={id}
      className={`card snap-start sticky top-0 w-full h-screen ${zIndex} flex justify-center items-center`}
    >
      {children(scrollAnimationProgress)}
      <Image
        className="bg-cover brightness-50 -z-10"
        src={bgImage}
        alt="bg"
        fill
      />
    </section>
  );
}

function useScrollAnimationProgress(
  yStartPosition: number,
  yEndPosition: number
) {
  const scrollAnimationProgress = useSpringValue(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < yStartPosition || window.scrollY > yEndPosition)
        return;

      const scrollPosition = window.scrollY;
      const scrollPositionPercentage = (scrollPosition - yStartPosition) / 2;

      scrollAnimationProgress.start(scrollPositionPercentage);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [yStartPosition, yEndPosition, scrollAnimationProgress]);

  return scrollAnimationProgress;
}

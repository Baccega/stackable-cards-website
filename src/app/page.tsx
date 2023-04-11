"use client";

import React from "react";
import bg1 from "../../public/bg-1.jpg";
import bg2 from "../../public/bg-2.jpg";
import bg3 from "../../public/bg-3.jpg";
import bg4 from "../../public/bg-4.jpg";
import bg5 from "../../public/bg-5.jpg";
// import parallaxBg1 from "../../public/parallax-1/parallax-mountain-bg.jpeg";
// import parallaxBg2 from "../../public/parallax-1/parallax-mountain-montain-far.png";
// import parallaxBg3 from "../../public/parallax-1/parallax-mountain-mountains.png";
// import parallaxBg4 from "../../public/parallax-1/parallax-mountain-trees.png";
// import parallaxBg5 from "../../public/parallax-1/parallax-mountain-foreground-trees.png";
import parallax2Bg1 from "../../public/parallax-2/01_Mist.png";
import parallax2Bg2 from "../../public/parallax-2/02_Bushes.png";
import parallax2Bg3 from "../../public/parallax-2/03_Particles.png";
import parallax2Bg4 from "../../public/parallax-2/04_Forest.png";
import parallax2Bg5 from "../../public/parallax-2/05_Particles.png";
import parallax2Bg6 from "../../public/parallax-2/06_Forest.png";
import parallax2Bg7 from "../../public/parallax-2/07_Forest.png";
import parallax2Bg8 from "../../public/parallax-2/08_Forest.png";
import parallax2Bg9 from "../../public/parallax-2/09_Forest.png";
import parallax2Bg10 from "../../public/parallax-2/10_Sky.png";

import useScrollTo from "react-spring-scroll-to-hook";
import { useScrollDirection } from "react-use-scroll-direction";
import { Inter } from "next/font/google";
import {
  config,
  animated,
  SpringValue,
  useSpringValue,
  useSpring,
  to,
} from "react-spring";
import Image, { StaticImageData } from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

type SectionCard = {
  id: string;
  bgImage: StaticImageData;
  zIndex: string;
  yStartPosition: number;
  yEndPosition: number;
  content?: React.ReactNode;
};

const createSectionCards: (innerHeight: number) => SectionCard[] = (
  innerHeight
) => [
  {
    id: "card-1",
    zIndex: "z-10",
    bgImage: parallax2Bg1,
    yStartPosition: 0 * innerHeight,
    yEndPosition: 1 * innerHeight,
    content: (
      <SectionCard1
        sectionCardData={{
          id: "card-1",
          zIndex: "z-10",
          bgImage: parallax2Bg1,
          yStartPosition: 0 * innerHeight,
          yEndPosition: 1 * innerHeight,
        }}
      />
    ),
  },
  {
    id: "card-2",
    zIndex: "z-20",
    bgImage: bg2,
    yStartPosition: 1 * innerHeight,
    yEndPosition: 2 * innerHeight,
    content: <animated.div className="radial-progress"></animated.div>,
  },
  {
    id: "card-3",
    zIndex: "z-30",
    bgImage: bg3,
    yStartPosition: 2 * innerHeight,
    yEndPosition: 3 * innerHeight,
    content: <animated.div className="radial-progress"></animated.div>,
  },
  {
    id: "card-4",
    zIndex: "z-40",
    bgImage: bg4,
    yStartPosition: 3 * innerHeight,
    yEndPosition: 4 * innerHeight,
    content: <animated.div className="radial-progress"></animated.div>,
  },
  {
    id: "card-5",
    zIndex: "z-50",
    bgImage: bg5,
    yStartPosition: 4 * innerHeight,
    yEndPosition: 5 * innerHeight,
    content: <animated.div className="radial-progress"></animated.div>,
  },
];

function useScrollSnap() {
  const [isSnapDisabled, setIsSnapDisabled] = React.useState(false);
  const { scrollTo } = useScrollTo(config.gentle);
  const { isScrollingUp, isScrollingDown } = useScrollDirection();

  const padding = Math.floor(window?.innerHeight / 2);

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
      window?.scrollY % window?.innerHeight > window?.innerHeight - padding;

    if (shouldScrollToNext) {
      scrollTo(
        window?.innerHeight * Math.ceil(window?.scrollY / window?.innerHeight)
      );
    }
  }, [isScrollingUp, isSnapDisabled, padding, scrollTo]);

  // Scroll to prev section
  React.useEffect(() => {
    if (isSnapDisabled) return;

    const shouldScrollToPrev = window?.scrollY % window?.innerHeight < padding;

    if (shouldScrollToPrev) {
      scrollTo(
        window?.innerHeight * Math.floor(window?.scrollY / window?.innerHeight)
      );
    }
  }, [isScrollingDown, isSnapDisabled, padding, scrollTo]);

  return { handleScrollToSection };
}

export default function Home() {
  const innerHeight = useInnerHeight();
  const sectionCards = createSectionCards(innerHeight);
  const { handleScrollToSection } = useScrollSnap();
  // useShallowRouter({ onScrollTo: handleScrollToSection });

  return (
    <div className="w-full h-full relative text-white">
      <header className="z-50 fixed top-0 h-24 w-full flex justify-between items-center px-20 bg-opacity-0">
        <div>LOGO</div>
        <nav className="flex gap-x-20">
          <a onClick={() => handleScrollToSection(innerHeight * 0)}>Home</a>
          <a onClick={() => handleScrollToSection(innerHeight * 1)}>Contacts</a>
        </nav>
      </header>
      <main className="relative snap-y flex w-full flex-col items-center">
        {sectionCards.map((card) => (
          <SectionCard
            key={card.id}
            id={card.id}
            zIndex={card.zIndex}
            bgImage={card.bgImage}
            yStartPosition={card.yStartPosition}
            yEndPosition={card.yEndPosition}
          >
            {card.content}
          </SectionCard>
        ))}
      </main>
      <footer className="shadow-inner h-52 w-full bg-slate-700 flex items-center justify-center px-20">
        <h1 className="text-6xl font-bold">Footer</h1>
      </footer>
    </div>
  );
}

type SectionCardProp = {
  id: string;
  bgImage: StaticImageData;
  zIndex: string;
  yStartPosition: number;
  yEndPosition: number;
  children: React.ReactNode;
};

function SectionCard(props: SectionCardProp) {
  const { id, bgImage, zIndex, children, yStartPosition, yEndPosition } = props;

  return (
    <section
      id={id}
      style={{
        backgroundImage: `url(${bgImage.src})`,
      }}
      className={`sectionCard bg-center overflow-hidden bg-cover snap-start sticky top-0 w-full h-screen ${zIndex} flex justify-center items-center`}
    >
      {children}
    </section>
  );
}

type UseScrollingSpringProps = {
  yStartPosition: number;
  yEndPosition: number;
};

function useScrollingSpring({
  yStartPosition,
  yEndPosition,
}: UseScrollingSpringProps) {
  const [springProps, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  React.useEffect(() => {
    const handleScroll = () => {
      if (window?.scrollY < yStartPosition || window?.scrollY > yEndPosition)
        return;

      const scrollPosition = window?.scrollY;
      const scrollPositionPercentage = (scrollPosition - yStartPosition) / 2;

      api.start({
        x: scrollPositionPercentage,
        y: scrollPositionPercentage,
        config: config.molasses,
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [yStartPosition, yEndPosition, springProps, api]);

  return springProps;
}

type SectionCard1Props = {
  sectionCardData: SectionCard;
};

function SectionCard1(props: SectionCard1Props) {
  const { sectionCardData } = props;
  const scrollingSpring = useScrollingSpring({
    yStartPosition: sectionCardData.yStartPosition,
    yEndPosition: sectionCardData.yEndPosition,
  });

  return (
    <animated.div className="relative w-full h-full brightness-50">
      <animated.span
        className="absolute bg-center bg-cover bottom-0 h-full"
        style={{
          zIndex: 19,
          width: "120%",
          backgroundImage: `url(${parallax2Bg2.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -100])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-center bg-cover bottom-0 h-full"
        style={{
          zIndex: 18,
          width: "120%",
          backgroundImage: `url(${parallax2Bg3.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -90])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-center bg-cover bottom-0 h-full"
        style={{
          zIndex: 17,
          width: "120%",
          backgroundImage: `url(${parallax2Bg4.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -70])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-center bg-cover bottom-0 h-full"
        style={{
          zIndex: 16,
          width: "120%",
          backgroundImage: `url(${parallax2Bg5.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -60])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-center bg-cover bottom-0 h-full"
        style={{
          zIndex: 15,
          width: "120%",
          backgroundImage: `url(${parallax2Bg6.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -50])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-center bg-cover bottom-0 h-full"
        style={{
          zIndex: 14,
          width: "120%",
          backgroundImage: `url(${parallax2Bg7.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -40])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-center bg-cover bottom-0 h-full"
        style={{
          zIndex: 13,
          width: "120%",
          backgroundImage: `url(${parallax2Bg8.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -30])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-center bg-cover bottom-0 h-full"
        style={{
          zIndex: 12,
          width: "120%",
          backgroundImage: `url(${parallax2Bg9.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -20])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-center bg-cover bottom-0 h-full"
        style={{
          zIndex: 11,
          width: "120%",
          backgroundImage: `url(${parallax2Bg10.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -10])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
    </animated.div>
  );
}

function useInnerHeight() {
  const [innerHeight, setInnerHeight] = React.useState(0);

  React.useEffect(() => {
    setInnerHeight(window?.innerHeight);
  }, []);

  return innerHeight;
}

type UseShallowRouterProps = {
  onScrollTo: (y: number) => void;
};

function useShallowRouter({ onScrollTo }: UseShallowRouterProps) {
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [currentSection, setCurrentSection] = React.useState(0);
  const router = useRouter();
  // const searchParams = useSearchParams();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window?.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const section = Math.floor(scrollPosition / window?.innerHeight);

    if (section !== currentSection) {
      setCurrentSection(section);
    }
  }, [currentSection, scrollPosition]);

  React.useEffect(() => {
    router.replace(`#${currentSection}`);
    onScrollTo(SECTION_CARDS[currentSection].yStartPosition);
  }, [currentSection, onScrollTo, router]);
}

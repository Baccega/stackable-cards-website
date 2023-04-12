"use client";

import React from "react";
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
import parallax3Clouds1 from "../../public/parallax-3/clouds_1.png";
import parallax3Clouds2 from "../../public/parallax-3/clouds_2.png";
import parallax3Ground1 from "../../public/parallax-3/ground_1.png";
import parallax3Ground2 from "../../public/parallax-3/ground_2.png";
import parallax3Ground3 from "../../public/parallax-3/ground_3.png";
import parallax3Plants from "../../public/parallax-3/plant.png";
import parallax3Rocks from "../../public/parallax-3/rocks.png";
import parallax3Sky from "../../public/parallax-3/sky.png";
import parallax4Clouds1 from "../../public/parallax-4/clouds_1.png";
import parallax4Clouds2 from "../../public/parallax-4/clouds_2.png";
import parallax4Clouds3 from "../../public/parallax-4/clouds_3.png";
import parallax4Clouds4 from "../../public/parallax-4/clouds_4.png";
import parallax4Rocks1 from "../../public/parallax-4/rocks_1.png";
import parallax4Rocks2 from "../../public/parallax-4/rocks_2.png";
import parallax4Sky from "../../public/parallax-4/sky.png";

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
    bgImage: parallax3Sky,
    yStartPosition: 1 * innerHeight,
    yEndPosition: 2 * innerHeight,
    content: (
      <SectionCard2
        sectionCardData={{
          id: "card-2",
          zIndex: "z-20",
          bgImage: parallax3Sky,
          yStartPosition: 1 * innerHeight,
          yEndPosition: 2 * innerHeight,
        }}
      />
    ),
  },
  {
    id: "card-3",
    zIndex: "z-30",
    bgImage: parallax4Sky,
    yStartPosition: 2 * innerHeight,
    yEndPosition: 3 * innerHeight,
    content: (
      <SectionCard3
        sectionCardData={{
          id: "card-3",
          zIndex: "z-30",
          bgImage: parallax4Sky,
          yStartPosition: 2 * innerHeight,
          yEndPosition: 3 * innerHeight,
        }}
      />
    ),
  },
];

function useScrollSnap() {
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
    if (isSnapDisabled || typeof window === "undefined") return;
    const padding = Math.floor(window?.innerHeight / 2);

    const shouldScrollToNext =
      window?.scrollY % window?.innerHeight > window?.innerHeight - padding;

    if (shouldScrollToNext) {
      scrollTo(
        window?.innerHeight * Math.ceil(window?.scrollY / window?.innerHeight)
      );
    }
  }, [isScrollingUp, isSnapDisabled, scrollTo]);

  // Scroll to prev section
  React.useEffect(() => {
    if (isSnapDisabled || typeof window === "undefined") return;
    const padding = Math.floor(window?.innerHeight / 2);

    const shouldScrollToPrev = window?.scrollY % window?.innerHeight < padding;

    if (shouldScrollToPrev) {
      scrollTo(
        window?.innerHeight * Math.floor(window?.scrollY / window?.innerHeight)
      );
    }
  }, [isScrollingDown, isSnapDisabled, scrollTo]);

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
        <nav className="flex gap-x-10">
          <a
            className="px-2 py-1 cursor-pointer border-transparent border hover:border-white hover:shadow-lg rounded-md"
            onClick={() => handleScrollToSection(innerHeight * 0)}
          >
            Card 1
          </a>
          <a
            className="px-2 py-1 cursor-pointer border-transparent border hover:border-white hover:shadow-lg rounded-md"
            onClick={() => handleScrollToSection(innerHeight * 1)}
          >
            Card 2
          </a>
          <a
            className="px-2 py-1 cursor-pointer border-transparent border hover:border-white hover:shadow-lg rounded-md"
            onClick={() => handleScrollToSection(innerHeight * 2)}
          >
            Card 3
          </a>
        </nav>
      </header>
      <main className="relative flex w-full flex-col items-center">
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
      className={`sectionCard bg-left overflow-hidden bg-cover snap-start sticky top-0 w-full h-screen ${zIndex} flex justify-center items-center`}
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
      if (window?.scrollY < yStartPosition || window?.scrollY > yEndPosition){
        api.stop();
        return;
      }

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
    <animated.div className="relative w-full h-full brightness-75">
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 19,
          width: "140%",
          backgroundImage: `url(${parallax2Bg2.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -150])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 18,
          width: "140%",
          backgroundImage: `url(${parallax2Bg3.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -120])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 17,
          width: "140%",
          backgroundImage: `url(${parallax2Bg4.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -100])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 16,
          width: "140%",
          backgroundImage: `url(${parallax2Bg5.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -80])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 15,
          width: "140%",
          backgroundImage: `url(${parallax2Bg6.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -60])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 14,
          width: "140%",
          backgroundImage: `url(${parallax2Bg7.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -40])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 13,
          width: "140%",
          backgroundImage: `url(${parallax2Bg8.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -30])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 12,
          width: "140%",
          backgroundImage: `url(${parallax2Bg9.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -20])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 11,
          width: "140%",
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

type SectionCard2Props = {
  sectionCardData: SectionCard;
};

function SectionCard2(props: SectionCard2Props) {
  const { sectionCardData } = props;
  const scrollingSpring = useScrollingSpring({
    yStartPosition: sectionCardData.yStartPosition,
    yEndPosition: sectionCardData.yEndPosition,
  });

  return (
    <animated.div className="relative w-full h-full brightness-75">
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 29,
          width: "140%",
          backgroundImage: `url(${parallax3Clouds1.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -100])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 28,
          width: "140%",
          backgroundImage: `url(${parallax3Clouds2.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, 100])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 27,
          width: "140%",
          backgroundImage: `url(${parallax3Ground1.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -200])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 26,
          width: "140%",
          backgroundImage: `url(${parallax3Ground2.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, 100])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 25,
          width: "140%",
          backgroundImage: `url(${parallax3Ground3.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -70])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 24,
          width: "140%",
          backgroundImage: `url(${parallax3Plants.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -100])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 23,
          width: "140%",
          backgroundImage: `url(${parallax3Rocks.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, 30])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
    </animated.div>
  );
}

type SectionCard3Props = {
  sectionCardData: SectionCard;
};

function SectionCard3(props: SectionCard3Props) {
  const { sectionCardData } = props;
  const scrollingSpring = useScrollingSpring({
    yStartPosition: sectionCardData.yStartPosition,
    yEndPosition: sectionCardData.yEndPosition,
  });

  return (
    <animated.div className="relative w-full h-full brightness-75">
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 39,
          width: "140%",
          backgroundImage: `url(${parallax4Clouds1.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -70])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 38,
          width: "140%",
          backgroundImage: `url(${parallax4Clouds2.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, 70])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 37,
          width: "140%",
          backgroundImage: `url(${parallax4Clouds3.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -150])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 36,
          width: "140%",
          backgroundImage: `url(${parallax4Clouds4.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, 100])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 34,
          width: "140%",
          backgroundImage: `url(${parallax4Rocks1.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -50])],
            (x) => `translate(${x}px)`
          ),
        }}
      />
      <animated.span
        className="absolute bg-left bg-cover bottom-0 h-full"
        style={{
          zIndex: 35,
          width: "140%",
          backgroundImage: `url(${parallax4Rocks2.src})`,
          transform: to(
            [scrollingSpring.x.to([0, 100], [0, -100])],
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

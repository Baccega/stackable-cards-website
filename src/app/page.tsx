"use client";

import React from "react";
import useScrollTo from "react-spring-scroll-to-hook";
import { useScrollDirection } from "react-use-scroll-direction";
import { Inter } from "next/font/google";
import { config } from "react-spring";

const inter = Inter({ subsets: ["latin"] });

type UseScrollSnapProp = {
  padding: number;
};

function useScrollSnap({ padding }: UseScrollSnapProp) {
  const [isSnapDisabled, setIsSnapDisabled] = React.useState(false);
  const { scrollTo } = useScrollTo(config.gentle);
  const { isScrollingUp, isScrollingDown } = useScrollDirection();

  const handleScrollToSection = React.useCallback((sectionPosition: number) => {
    setIsSnapDisabled(true);
    scrollTo(sectionPosition);
    setTimeout(() => setIsSnapDisabled(false), 500);
  }, [scrollTo]);

  // Scroll to next section
  React.useEffect(() => {
    if (isSnapDisabled) return;

    const shouldScrollToNext =
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
    
    const shouldScrollToPrev = window.scrollY % window.innerHeight < padding;

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
    padding: Math.floor(window.innerHeight / 2),
  });

  return (
    <div className="w-full h-full relative text-white">
      <header className="z-50 fixed top-0 h-24 w-full flex justify-between items-center px-20 bg-opacity-0">
        <div>LOGO</div>
        <nav className="flex gap-x-20">
          <a onClick={() => handleScrollToSection(window.innerHeight * 0)}>Home</a>
          <a onClick={() => handleScrollToSection(window.innerHeight * 1)}>Contacts</a>
        </nav>
      </header>
      <main className="relative snap-y flex w-full flex-col items-center">
        <Card id="card-1" zIndex="z-10" bgColor="bg-slate-700">
          <h1 className="text-6xl font-bold">Hello World 1</h1>
        </Card>
        <Card id="card-2" zIndex="z-20" bgColor="bg-slate-700">
          <h1 className="text-6xl font-bold">Hello World 2</h1>
        </Card>
        <Card id="card-3" zIndex="z-30" bgColor="bg-slate-700">
          <h1 className="text-6xl font-bold">Hello World 3</h1>
        </Card>
        <Card id="card-4" zIndex="z-40" bgColor="bg-slate-700">
          <h1 className="text-6xl font-bold">Hello World 4</h1>
        </Card>
      </main>
      <footer className="shadow-inner h-52 w-full bg-emerald-700 flex items-center justify-center px-20">
        <h1 className="text-6xl font-bold">Footer</h1>
      </footer>
    </div>
  );
}

type CardProp = {
  id: string;
  bgColor: string;
  zIndex: string;
  children: React.ReactNode;
};

function Card(props: CardProp) {
  const { id, bgColor, zIndex, children } = props;

  return (
    <section
      id={id}
      className={`card snap-start sticky top-0 w-full h-screen ${bgColor} ${zIndex} flex justify-center items-center`}
    >
      {children}
    </section>
  );
}

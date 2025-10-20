import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

export const Header = () => {
  return (
    <div className="fixed z-50 pt-2 md:pt-3 top-0 left-0 w-full">
      <header className="flex items-start justify-between px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-1.5 md:gap-2">
          <Logo className="w-[50px] md:w-[60px]" />
          <span className="font-sentient text-lg md:text-xl lg:text-2xl">
            NAM <i className="font-light">Rewards</i>
          </span>
        </Link>
        <div className="flex items-center gap-3 ml-auto">
          <ThemeToggle />
          <Link
            className="uppercase max-lg:hidden transition-colors ease-out duration-150 font-mono text-sm md:text-base bg-primary text-black hover:bg-primary/90 px-4 py-2 rounded-md whitespace-nowrap font-semibold"
            href="/whitepaper"
          >
            White Paper
          </Link>
          <MobileMenu />
        </div>
      </header>
    </div>
  );
};

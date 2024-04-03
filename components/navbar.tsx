"use client";
import { ChevronDown, GaugeIcon, PowerIcon, MenuIcon, Settings2Icon, Power } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { ThemeSwitcher } from './theme-switcher';
import Link from 'next/link';
import { Sheet, SheetContent } from './ui/sheet';

import Image from 'next/image'
import unidaLogo from '@/assets/unida.png'
import { usePathname, useRouter } from 'next/navigation';


const navLinkClasses = 'text-sm items-center font-medium tracking-tight text-muted-foreground hover:text-foreground inline-flex px-2 py-3 transition-colors duration-300';

interface NavLinkProps {
  active: boolean;
  children: React.ReactNode;
  href: string;
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <nav className="relative z-10 mx-auto hidden max-w-screen-2xl items-center justify-between border-b px-4 py-2.5 sm:flex sm:px-6">
        <div className="flex items-center">
          <Link href="/" className="mr-4 flex justify-between font-bold">
          <Image src={unidaLogo} className="me-2" alt="UNIDA Logo" width={40} height={40}/> <h2>Alumnida</h2>
          </Link>
          {navLinks.map((navLink, index) => (
            <NavLink key={index} active={navLink.route === '/'} href={navLink.route}>
              {navLink.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center">
          <ThemeSwitcher />
          <div className="mx-4 h-8 w-px bg-foreground/10" />
        </div>
      </nav>

      <nav className="sm:hidden">
        <div className="fixed top-0 z-20 flex w-full items-center justify-between border-b px-4 py-3 shadow-sm backdrop-blur-lg">
          <Link href="/" className="mr-4 flex justify-between font-bold">
          <Image src={unidaLogo} className="me-2" alt="UNIDA Logo" width={40} height={40}/> <h2>Alumnida</h2>
          </Link>
          <div>
            <ThemeSwitcher />
            <Button className="ml-2 h-8" size="icon" variant="secondary" onClick={() => setOpen(true)}>
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left">
            <Link href="/" className="mr-4 mb-4 flex items-center">
            <Image src={unidaLogo} className="me-2" alt="UNIDA Logo" width={40} height={40}/> <h2>Alumnida</h2>
            </Link>

            <div className="-mx-2 space-y-2">
              {navLinks.map((navLink, index) => (
                <NavLinkResponsive active={navLink.route === '/'} key={index} href={navLink.route}>
                  {navLink.label}
                </NavLinkResponsive>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}

const navLinks = [
    { label: 'Home', route: '/' },
    { label: 'Alumni', route: '/alumni' },
  { label: 'Website', route: 'https://unida.ac.id' },
];

export function NavLink({ children, href }: NavLinkProps) {
  const pathname = usePathname()
    const isActive = pathname === href;
  
    return (
      <Link href={href} className={cn(navLinkClasses, isActive && 'font-semibold text-foreground')}>
        {children}
      </Link>
    );
  }
interface NavLinkResponsiveProps {
  active: boolean;
  children: React.ReactNode;
  href: string;
}

export function NavLinkResponsive({  children, href }: NavLinkResponsiveProps) {
    
  const pathname = usePathname()
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center rounded px-2 py-2 text-sm hover:bg-accent',
        isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </Link>
  );
}

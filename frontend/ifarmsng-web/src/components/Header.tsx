"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Brand from "./Brand";
import { navLinks } from "@/data/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);

  // Close the mobile menu with Escape and return focus to the toggle.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        ref.current?.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // On desktop the links are always visible; a closed <details> would hide them.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 721px)");
    const sync = () => setOpen(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const close = () => {
    if (!window.matchMedia("(min-width: 721px)").matches) setOpen(false);
  };

  return (
    <header className="site-header" id="top">
      <nav className="nav container" aria-label="Main navigation">
        <Brand />
        <details
          className="mobile-navigation"
          ref={ref}
          open={open}
          onToggle={(e) => setOpen(e.currentTarget.open)}
        >
          <summary className="menu-toggle" aria-label="Toggle navigation">
            <span></span><span></span>
          </summary>
          <div className="nav-links" id="nav-links">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={close}>{l.label}</Link>
            ))}
            <Link className="button button-small button-dark nav-cta" href="/#contact" onClick={close}>
              Partner With Us <span>↗</span>
            </Link>
          </div>
        </details>
      </nav>
    </header>
  );
}

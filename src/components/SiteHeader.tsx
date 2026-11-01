"use client";

import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type FormEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AccessGLogo } from "@/components/AccessGLogo";
import { EVENT_CATEGORIES } from "@/lib/event-categories";

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function SubcategoryThumb({
  emoji,
  className = "",
}: {
  emoji: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 ${className}`}
    >
      <span className="absolute inset-0 animate-thumb-pan bg-gradient-to-br from-primary via-black to-accent opacity-25 motion-reduce:animate-none" />
      <span className="relative">{emoji}</span>
    </span>
  );
}

export function SiteHeader() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const activeCategory =
    EVENT_CATEGORIES.find((category) => category.slug === openMenu) ?? null;

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  function closeSearch() {
    setIsSearchOpen(false);
    setQuery("");
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function toggleSearch() {
    setIsSearchOpen((open) => !open);
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((open) => !open);
    setIsSearchOpen(false);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  function handleHeaderBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenMenu(null);
    }
  }

  return (
    <header
      className="sticky top-0 z-50 m-0 w-full border-b border-white/5 bg-black/80 backdrop-blur-xl"
      onMouseLeave={() => setOpenMenu(null)}
      onBlur={handleHeaderBlur}
    >
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-6 py-3 sm:px-10 lg:py-4">
        <Link
          href="/"
          aria-label="AccessG home"
          className="inline-flex shrink-0 items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <span className="sm:hidden">
            <AccessGLogo variant="symbol" height={32} />
          </span>
          <span className="hidden sm:block">
            <AccessGLogo variant="dark" />
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-[0.6rem] lg:flex"
        >
          <Link
            href="/events"
            className="rounded-full px-1.5 py-2 font-label text-sm font-medium tracking-[-0.025rem] text-primary transition-colors hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Discover
          </Link>

          {EVENT_CATEGORIES.map((category) => {
            const isOpen = openMenu === category.slug;

            return (
              <div
                key={category.slug}
                onMouseEnter={() => setOpenMenu(category.slug)}
              >
                <Link
                  href={`/events#${category.slug}`}
                  onFocus={() => setOpenMenu(category.slug)}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  aria-controls={`mega-${category.slug}`}
                  className={`flex items-center gap-1 rounded-full px-1.5 py-2 font-label text-sm font-medium tracking-[-0.025rem] transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isOpen ? "text-primary" : "text-inverse-on-surface"
                  }`}
                >
                  {category.label}
                  <ChevronIcon
                    className={`h-3 w-3 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={toggleSearch}
            aria-label={isSearchOpen ? "Close event search" : "Search events"}
            aria-expanded={isSearchOpen}
            aria-controls="global-search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-inverse-on-surface backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {isSearchOpen ? <CloseIcon className="h-4 w-4" /> : <SearchIcon className="h-4 w-4" />}
          </button>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/login"
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-label text-sm font-medium tracking-[-0.025rem] text-inverse-on-surface backdrop-blur-sm transition-all hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-primary px-4 py-2 font-label text-sm font-medium tracking-[-0.025rem] text-on-primary-fixed transition-all hover:font-semibold hover:shadow-medium-shadow hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Sign Up
            </Link>
          </div>

          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-inverse-on-surface backdrop-blur-sm transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
          >
            {isMobileMenuOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
          </button>
        </div>

        {activeCategory && (
          <div
            id={`mega-${activeCategory.slug}`}
            className="absolute left-1/2 top-full z-50 hidden w-[min(92vw,52rem)] -translate-x-1/2 pt-2 lg:block"
            onMouseEnter={() => setOpenMenu(activeCategory.slug)}
          >
            <div className="animate-slide-down rounded-2xl border border-white/10 bg-black/95 p-6 backdrop-blur-xl">
              <div className="flex flex-col gap-4 border-b border-white/5 pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-label text-xs font-medium uppercase tracking-[0.2em] text-accent">
                    Browse the marketplace
                  </p>
                  <h2 className="mt-1 font-headline text-lg font-semibold tracking-[-0.063rem] text-inverse-on-surface">
                    {activeCategory.title}
                  </h2>
                  <p className="mt-1 max-w-md font-body text-sm font-medium text-outline">
                    {activeCategory.blurb}
                  </p>
                </div>
                <Link
                  href={`/events#${activeCategory.slug}`}
                  className="shrink-0 rounded-full border border-accent px-4 py-2 font-label text-xs font-medium uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  View all
                </Link>
              </div>

              <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {activeCategory.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={`/search?q=${encodeURIComponent(item.label)}`}
                      className="group/item -mx-2 flex items-start gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <SubcategoryThumb
                        emoji={item.emoji}
                        className="h-14 w-14 text-2xl"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block font-label text-sm font-medium text-inverse-on-surface transition-colors group-hover/item:text-primary">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block font-body text-xs leading-relaxed text-outline">
                          {item.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {isSearchOpen && (
        <div className="border-t border-white/5 bg-black/90 px-6 pb-4 pt-3 backdrop-blur-xl sm:px-10">
          <form
            id="global-search"
            role="search"
            onSubmit={handleSearchSubmit}
            onKeyDown={(event) => {
              if (event.key === "Escape") closeSearch();
            }}
            className="mx-auto flex w-full max-w-2xl animate-slide-down items-center gap-1 rounded-full border border-accent bg-black/90 p-1 shadow-soft-shadow"
          >
            <SearchIcon className="ml-3 h-4 w-4 shrink-0 text-accent" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search concerts, festivals, experiences..."
              aria-label="Search events"
              className="min-w-0 flex-1 bg-transparent px-2 py-2 font-body text-sm font-medium text-inverse-on-surface placeholder:text-outline focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-accent px-4 py-2 font-label text-xs font-semibold uppercase tracking-wider text-black transition-all hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              Search
            </button>
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
              className="rounded-full px-3 py-2 text-outline transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {isMobileMenuOpen && (
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/5 bg-black/95 px-6 pb-6 pt-3 backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile primary">
            <Link
              href="/events"
              onClick={closeMobileMenu}
              className="block rounded-lg px-2 py-2.5 font-label text-sm font-medium text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Discover the marketplace
            </Link>

            {EVENT_CATEGORIES.map((category) => (
              <details
                key={category.slug}
                className="group border-b border-white/5 last:border-b-0"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-2 py-3 font-label text-sm font-medium text-inverse-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
                  <span>{category.title}</span>
                  <ChevronIcon className="h-4 w-4 shrink-0 text-outline transition-transform group-open:rotate-180" />
                </summary>
                <ul className="pb-2 pl-2">
                  {category.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={`/search?q=${encodeURIComponent(item.label)}`}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-body text-sm font-medium text-outline transition-colors hover:bg-white/5 hover:text-inverse-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <SubcategoryThumb
                          emoji={item.emoji}
                          className="h-9 w-9 text-base"
                        />
                        <span className="min-w-0 flex-1">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </nav>

          <div className="mt-4 flex items-center gap-2">
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-center font-label text-sm font-medium text-inverse-on-surface transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={closeMobileMenu}
              className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center font-label text-sm font-medium text-on-primary-fixed transition-all hover:font-semibold hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

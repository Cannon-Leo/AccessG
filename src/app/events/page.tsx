import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { EVENT_CATEGORIES } from "@/lib/event-categories";

export const metadata: Metadata = {
  title: "Ticket Marketplace | AccessG",
  description:
    "Browse every public event on AccessG: live music, nightlife, tech and Web3, arts and culture, and private studio experiences.",
};

export default function EventsPage() {
  return (
    <div className="min-h-[100dvh] bg-black text-inverse-on-surface">
      <SiteHeader />

      <main className="mx-auto w-full max-w-7xl px-6 pb-20 pt-12 sm:px-10">
        <p className="font-label text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Ticket marketplace
        </p>
        <h1 className="mt-3 max-w-3xl font-headline text-3xl font-semibold tracking-[-0.113rem] text-inverse-on-surface sm:text-4xl">
          Every public event, in one place
        </h1>
        <p className="mt-3 max-w-2xl font-body text-base font-medium leading-normal tracking-[-0.05rem] text-outline">
          Discover concerts, nightlife, tech meetups, culture and studio experiences. Search the
          full catalogue or jump straight into a category below.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <form
            method="get"
            action="/search"
            role="search"
            className="flex flex-1 items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1"
          >
            <label htmlFor="marketplace-search" className="sr-only">
              Search all events
            </label>
            <input
              id="marketplace-search"
              name="q"
              type="search"
              placeholder="Search all events..."
              className="min-w-0 flex-1 bg-transparent px-4 py-2 font-body text-sm font-medium text-inverse-on-surface placeholder:text-outline focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2 font-label text-sm font-medium tracking-[-0.025rem] text-on-primary-fixed transition-all hover:font-semibold hover:shadow-medium-shadow hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Search
            </button>
          </form>
          <Link
            href="/search"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 font-label text-sm font-medium tracking-[-0.025rem] text-inverse-on-surface transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Open filters
          </Link>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2" aria-label="Event categories">
          {EVENT_CATEGORIES.map((category) => (
            <li key={category.slug}>
              <a
                href={`#${category.slug}`}
                className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-2 font-label text-xs font-medium uppercase tracking-[0.08em] text-outline transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {category.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
          <p className="font-headline text-lg font-semibold tracking-[-0.063rem] text-inverse-on-surface">
            No events are live yet
          </p>
          <p className="mt-1 max-w-2xl font-body text-sm font-medium leading-relaxed text-outline">
            Public events will appear in the marketplace as soon as creators publish them. Studio
            events stay hidden from search and require an access code.
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {EVENT_CATEGORIES.map((category) => (
            <section
              key={category.slug}
              id={category.slug}
              aria-labelledby={`${category.slug}-heading`}
              className="scroll-mt-28"
            >
              <div className="flex flex-col gap-3 border-b border-white/5 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2
                    id={`${category.slug}-heading`}
                    className="font-headline text-2xl font-semibold tracking-[-0.094rem] text-inverse-on-surface"
                  >
                    {category.title}
                  </h2>
                  <p className="mt-1 max-w-2xl font-body text-sm font-medium text-outline">
                    {category.blurb}
                  </p>
                </div>
                <Link
                  href={`/search?q=${encodeURIComponent(category.title)}`}
                  className="shrink-0 rounded-full border border-white/15 px-4 py-2 font-label text-xs font-medium uppercase tracking-wider text-outline transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Search this category
                </Link>
              </div>

              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={`/search?q=${encodeURIComponent(item.label)}`}
                      className="group block h-full rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-primary hover:bg-white/10 hover:shadow-soft-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <span className="font-label text-sm font-medium text-inverse-on-surface transition-colors group-hover:text-primary">
                        {item.label}
                      </span>
                      <span className="mt-2 block font-body text-xs font-medium leading-relaxed text-outline">
                        {item.description}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-1 font-label text-xs font-medium uppercase tracking-wider text-primary">
                        Browse tickets
                        <span aria-hidden="true">→</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {category.slug === "studio" && (
                <p className="mt-4 font-body text-sm font-medium leading-relaxed text-outline">
                  Private studio events are not searchable. Use{" "}
                  <Link
                    href="/"
                    className="font-semibold text-accent underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Have a Studio Code?
                  </Link>{" "}
                  on the home page to unlock one.
                </p>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

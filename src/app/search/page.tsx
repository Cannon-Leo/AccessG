import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Search Events | AccessG",
  description:
    "Search public concerts, festivals and experiences by keyword, city, date, price and availability.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const fieldLabel =
  "mb-1.5 block font-label text-xs font-medium uppercase tracking-[0.12em] text-outline";

const fieldInput =
  "w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 font-body text-sm font-medium text-inverse-on-surface placeholder:text-outline transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent [color-scheme:dark]";

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

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

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  const q = firstValue(params.q).trim();
  const location = firstValue(params.location).trim();
  const from = firstValue(params.from);
  const to = firstValue(params.to);
  const maxPrice = firstValue(params.maxPrice);
  const availabilityParam = firstValue(params.availability);
  const sortParam = firstValue(params.sort);

  const availability = availabilityParam === "available" ? "available" : "any";
  const sort = sortParam === "price-asc" || sortParam === "newest" ? sortParam : "date";
  const maxPriceNumber = Number(maxPrice);
  const maxPriceLabel =
    maxPrice && Number.isFinite(maxPriceNumber)
      ? `Under ₦${maxPriceNumber.toLocaleString("en-NG")}`
      : "";

  const activeFilters = [
    q ? `“${q}”` : "",
    location ? `Location: ${location}` : "",
    from ? `From: ${from}` : "",
    to ? `To: ${to}` : "",
    maxPriceLabel,
    availability === "available" ? "Available only" : "",
  ].filter(Boolean);

  const hasFilters = activeFilters.length > 0;
  const resultCount = 0;

  return (
    <div className="min-h-[100dvh] bg-black text-inverse-on-surface">
      <SiteHeader />

      <main className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-12 sm:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-white/5 via-black/0 to-transparent"
        />

        <p className="font-label text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Event discovery
        </p>
        <h1 className="mt-3 font-headline text-3xl font-semibold tracking-[-0.094rem] text-inverse-on-surface sm:text-4xl">
          Find your next event
        </h1>
        <p className="mt-3 max-w-2xl font-body text-base font-medium leading-normal tracking-[-0.05rem] text-outline">
          Search public concerts, festivals and experiences, then narrow by city, date, price and
          availability before you decide to buy.
        </p>

        <form
          method="get"
          action="/search"
          className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
              <label htmlFor="q" className="sr-only">
                Search events
              </label>
              <input
                id="q"
                name="q"
                type="search"
                defaultValue={q}
                placeholder="Search by event, artist, or vibe..."
                className={`${fieldInput} pl-11`}
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-primary px-6 py-2.5 font-label text-sm font-medium tracking-[-0.025rem] text-on-primary-fixed transition-all hover:font-semibold hover:shadow-medium-shadow hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Search events
            </button>
          </div>

          <div className="mt-5 grid gap-4 border-t border-white/5 pt-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="location" className={fieldLabel}>
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                defaultValue={location}
                placeholder="Lagos, Abuja, Port Harcourt..."
                className={fieldInput}
              />
            </div>

            <div>
              <label htmlFor="from" className={fieldLabel}>
                From date
              </label>
              <input id="from" name="from" type="date" defaultValue={from} className={fieldInput} />
            </div>

            <div>
              <label htmlFor="to" className={fieldLabel}>
                To date
              </label>
              <input id="to" name="to" type="date" defaultValue={to} className={fieldInput} />
            </div>

            <div>
              <label htmlFor="maxPrice" className={fieldLabel}>
                Max price (₦)
              </label>
              <input
                id="maxPrice"
                name="maxPrice"
                type="number"
                min="0"
                step="500"
                defaultValue={maxPrice}
                placeholder="Any price"
                className={fieldInput}
              />
            </div>

            <div>
              <label htmlFor="availability" className={fieldLabel}>
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                defaultValue={availability}
                className={fieldInput}
              >
                <option value="any">Any availability</option>
                <option value="available">Available only</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort" className={fieldLabel}>
                Sort by
              </label>
              <select id="sort" name="sort" defaultValue={sort} className={fieldInput}>
                <option value="date">Soonest first</option>
                <option value="price-asc">Price: low to high</option>
                <option value="newest">Newly published</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2.5 font-label text-sm font-medium tracking-[-0.025rem] text-on-primary-fixed transition-all hover:font-semibold hover:shadow-medium-shadow hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Apply filters
            </button>
            <Link
              href="/search"
              className="rounded-full border border-white/15 px-5 py-2.5 font-label text-sm font-medium tracking-[-0.025rem] text-outline transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Reset
            </Link>
            <p className="font-body text-xs font-medium text-outline">
              Dates and prices are optional. Prices are shown in Naira.
            </p>
          </div>
        </form>

        <section aria-labelledby="results-heading" className="mt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2
              id="results-heading"
              className="font-headline text-xl font-semibold tracking-[-0.063rem] text-inverse-on-surface"
            >
              Search results
            </h2>
            <p aria-live="polite" className="font-label text-sm font-medium text-outline">
              {resultCount} events
            </p>
          </div>

          {hasFilters && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
              {activeFilters.map((filter) => (
                <li
                  key={filter}
                  className="rounded-full border border-accent bg-black/40 px-3 py-1 font-label text-xs font-medium text-accent"
                >
                  {filter}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center sm:px-10 sm:py-16">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-accent bg-black/40 text-accent">
              <SearchIcon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-headline text-xl font-semibold tracking-[-0.063rem] text-inverse-on-surface">
              {hasFilters ? "No events match this search" : "No events published yet"}
            </h3>
            <p className="mx-auto mt-2 max-w-md font-body text-sm font-medium leading-relaxed text-outline">
              {hasFilters
                ? "Try a different city, widen the date range, raise the price limit, or clear your filters to see everything."
                : "Public events will appear here as soon as creators publish them. Studio events stay private and cannot be searched."}
            </p>
            <Link
              href="/search"
              className="mt-6 inline-block rounded-full border border-accent px-5 py-2.5 font-label text-sm font-medium tracking-[-0.025rem] text-accent transition-all hover:bg-accent hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Clear filters
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="h-[100dvh] w-full flex flex-col justify-between p-6 sm:p-10 bg-surface text-on-surface overflow-hidden">
      {/* Top Header / App Brand */}
      <header className="flex items-center justify-between w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-3.5 h-3.5 rounded-full bg-primary border border-on-primary-fixed/20 shadow-sm" 
            aria-hidden="true" 
          />
          <span className="font-headline font-semibold text-lg tracking-tight text-on-surface">
            Access<span className="text-on-primary-fixed underline decoration-primary decoration-4 underline-offset-4">G</span>
          </span>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-label font-medium uppercase tracking-wider bg-surface-container-highest text-on-surface-variant border border-outline-variant">
          Live Gate System
        </span>
      </header>

      {/* Hero Content Section */}
      <section className="flex flex-col items-center text-center justify-center max-w-xl mx-auto my-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary-fixed border border-outline-variant text-xs font-label font-semibold uppercase tracking-widest shadow-sm">
          Offline Pass Architecture
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-on-surface leading-[1.1]">
          Instant Gate Access. <br />
          <span className="text-on-primary-fixed bg-primary-container/60 px-2 py-0.5 rounded-md inline-block mt-1">
            Zero Network Drop.
          </span>
        </h1>

        <p className="text-sm sm:text-base font-body text-on-surface-variant max-w-md mx-auto leading-relaxed">
          High-concurrency ticket checkouts paired with IndexedDB offline digital passes for instant QR venue gate validation.
        </p>

        {/* Action Controls */}
        <div className="w-full max-w-sm pt-4 flex flex-col gap-3">
          <button
            type="button"
            className="w-full py-4 px-6 rounded-xl font-label font-bold text-sm tracking-wide bg-primary text-on-primary-fixed border border-on-primary-fixed/20 shadow-soft-shadow hover:shadow-medium-shadow hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-on-primary-fixed"
          >
            Access Digital Pass
          </button>

          <button
            type="button"
            className="w-full py-3.5 px-6 rounded-xl font-label font-medium text-sm tracking-wide bg-surface-container text-on-surface hover:bg-surface-container-highest border border-outline-variant transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-outline"
          >
            Unlock Studio Event
          </button>
        </div>
      </section>

      {/* Footer System Telemetry Status */}
      <footer className="w-full max-w-4xl mx-auto flex items-center justify-between text-xs font-body text-on-surface-variant pt-4 border-t border-outline-variant">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-primary border border-on-primary-fixed/30" aria-hidden="true" />
          <span>PostgreSQL Row-Locking Active</span>
        </div>
        <span>AccessG v0.1.0</span>
      </footer>
    </main>
  );
}

# Folder Map Rules

- Use the Next.js App Router strictly located in `src/app`. Reason: It is the modern Next.js standard required for Server Components and React 18+ features.
- Place all UI components in `src/components`. Reason: Keeps the routing directory clean of reusable view logic.
- Place the instantiated Prisma client in `src/lib/db.ts`. Reason: Prevents the application from exhausting database connections by spawning multiple Prisma instances during hot module reloading.
- Place all server actions and database mutations in `src/actions`. Reason: Isolates server-side logic from client-side UI rendering.
- Place the Service Worker file in `public/sw.js`. Reason: The Next.js framework requires service workers to sit in the public directory to serve them at the root scope.
---
name: scaffold-telemetry-endpoint
description: Wraps a new Next.js API route in the structured logging required to measure backend resolution latency.
---

1. Create the new API route file. Follow rules/folder-map-rules.md for the correct App Router directory path.

2. Initialize a performance timer at the very beginning of the route handler.

3. Wrap the core route logic inside a try/catch block.

4. Stop the performance timer immediately after the core logic resolves or catches an error.

5. Calculate the total execution time in milliseconds.

6. Write the execution time and route name to standard output as a structured JSON log. Follow rules/metrics-rules.md for the exact telemetry requirements.

7. Return the final HTTP response to the client.
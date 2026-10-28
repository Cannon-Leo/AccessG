# Metrics Rules

- Log all backend scan resolutions as structured JSON to `stdout` containing the exact execution time in milliseconds. Reason: Standardized logging allows external monitoring tools to parse the sub-100ms latency requirement.
- Build an API endpoint at `/api/telemetry` to receive frontend metrics. Reason: Client-side applications cannot write to server logs directly.
- The Service Worker must queue offline load success metrics and sync them to `/api/telemetry` when the network connection is restored. Reason: If the device is offline, instant telemetry transmission will fail and the data will be lost.
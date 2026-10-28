# Vector Architecture Rules

- Use the official OpenAI Node SDK to generate embeddings with `text-embedding-3-small`. Reason: It provides the most cost-effective latency for generating the 1536-dimension arrays.
- Use Prisma `$queryRaw` for all semantic searches. Reason: Prisma cannot perform vector math natively. 
- Format the raw SQL query to use `vector_cosine_ops` against the `hnsw` index. Reason: Cosine similarity provides the most accurate semantic matching for event descriptions.
- The LLM must never access the database directly. Reason: The LLM is a router. It must extract the search string and pass it to a backend function to prevent prompt injection attacks against the database.
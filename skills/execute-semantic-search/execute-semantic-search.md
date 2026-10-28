---
name: execute-semantic-search
description: Sequences the OpenAI embedding generation and the raw PostgreSQL vector query.
---

1. Extract the semantic search string from the user request.

2. Call the OpenAI embeddings API. Follow rules/vector-architecture-rules.md for the exact model.

3. Extract the vector float array from the API response.

4. Format the float array into a string compatible with PostgreSQL vector syntax.

5. Execute a raw SQL query using Prisma. Follow rules/vector-architecture-rules.md to apply the cosine similarity operator.

6. Parse the returned database rows into standard event objects.

7. Return the matching events to the client.
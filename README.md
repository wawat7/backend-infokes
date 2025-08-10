# Requirement
- Bun 1.2.19 or above
- PostgreSQL
- Redis

# How to install
1. clone project
2. setup file .env
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/infokes?schema=public"

REDIS_HOST=localhost
REDIS_PASSWORD=password

```
3. install dependencies
```
bun install
```
4. run app
```
bun run dev
```

# Why Use Redis
Redis can help speed up data loading, especially when dealing with large data, which is crucial for maintaining application responsiveness and a good user experience.

# Why use partition PostgreSQL
To handle large data and improve query performance, techniques such as indexing, and partitioning

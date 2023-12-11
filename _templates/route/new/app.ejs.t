---
inject: true
to: src/app.ts
before: const port = process.env.PORT || 5000;
---
app.use("/<%= name %>", <%= name %>Router)

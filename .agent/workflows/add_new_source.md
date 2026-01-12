---
description: How to add a new news source to the NewsNow application
---

# Add New News Source

This workflow outlines the steps to integrate a new news source into the application.

## 1. Define Metadata

**File**: `shared/pre-sources.ts`

Add the new source configuration to the `originSources` object.

```typescript
"new-source-id": {
  name: "Source Name",
  column: "tech", // Options: 'china', 'world', 'tech', 'finance'
  color: "blue",  // Options: 'red', 'green', 'orange', 'blue', 'gray', 'slate', 'teal', 'indigo'
  home: "https://example.com",
  type: "hottest", // Options: 'realtime', 'hottest'
  interval: Time.Common, // Optional: Time.Realtime, Time.Fast. Defaults to Time.Default (10m)
}
```

## 2. Implement Data Fetcher

**File**: `server/sources/[new-source-id].ts`

Create a new file in `server/sources/` with the filename matching the ID used in metadata.

### Option A: Custom Crawler (Standard)

Use this for most dynamic websites.

```typescript
export default defineSource({
  "new-source-id": async () => {
    const url = "https://api.example.com/news";
    const res = await myFetch(url);

    return res.data.map((item) => ({
      id: item.id, // Unique ID
      title: item.title,
      url: item.link,
      extra: {
        info: item.author, // Optional: displayed as metadata
        hover: item.summary, // Optional: displayed on hover
      },
    }));
  },
});
```

### Option B: RSS Feed

Use this if the site provides a standard RSS feed.

```typescript
export default defineSource({
  "new-source-id": defineRSSSource("https://example.com/rss"),
});
```

### Option C: RSSHub

Use this if you are using a public RSSHub instance.

```typescript
export default defineSource({
  "new-source-id": defineRSSHubSource("/rsshub/route"),
});
```

## 3. Verify

1. Restart the server to register the new file:
   ```bash
   npx pnpm dev
   ```
2. Open the application and check the configured column.

export default defineSource({
  "reddit-ai-monitor": defineRSSSource("https://www.reddit.com/r/artificial/.rss", {
    request: {
      headers: {
        "User-Agent": "newsnow:v0.0.40 (source health monitor)",
        "Accept": "application/atom+xml, application/xml;q=0.9, */*;q=0.8",
      },
      retry: 0,
    },
  }),
})

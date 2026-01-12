import { defineForeignSource } from "../../utils/proxy"

export default defineSource({
  "aeon": defineForeignSource("https://aeon.co/feed.rss"),
})

import { defineForeignSource } from "../../utils/proxy"

export default defineSource({
  "tldr": defineForeignSource("https://tldr.tech/api/rss/tech"),
})

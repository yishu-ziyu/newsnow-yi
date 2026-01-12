import { defineForeignSource } from "../../utils/proxy"

export default defineSource({
  "farnam-street": defineForeignSource("https://fs.blog/feed/"),
})

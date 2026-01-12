import { defineForeignSource } from "../../utils/proxy"

export default defineSource({
  "lennys": defineForeignSource("https://www.lennysnewsletter.com/feed"),
})

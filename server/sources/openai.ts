import { load } from "cheerio"

export default defineSource({
  "openai": async () => {
    const url = "https://openai.com/news/research/"
    const res = await myFetch(url)
    const $ = load(res)

    return $("a[href^='/index/']").map((_, el) => {
      const $el = $(el)
      const title = $el.find(".text-h5").text().trim()
      const href = $el.attr("href")
      const date = $el.find("time").text().trim()

      return {
        id: href ?? "",
        title: title || "OpenAI Research",
        url: href?.startsWith("http") ? href : `https://openai.com${href}`,
        extra: {
          info: date,
        },
      }
    }).get()
  },
})

import { MetadataRoute } from "next";

const BASE_URL = "https://sergeo-limta-portfolio.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Crawlers web classiques
      {
        userAgent: "*",
        allow: "/",
      },
      // GPTBot (ChatGPT / OpenAI)
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      // ClaudeBot (Anthropic)
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      // PerplexityBot
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // Google-Extended (Gemini / Google AI)
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // Meta-ExternalAgent (Meta AI)
      {
        userAgent: "Meta-ExternalAgent",
        allow: "/",
      },
      // Applebot-Extended (Apple Intelligence)
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      // Cohere AI
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

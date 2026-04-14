import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: "https://rifandiysf.vercel.app", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
        { url: "https://rifandiysf.vercel.app/about", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: "https://rifandiysf.vercel.app/project", lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
        { url: "https://rifandiysf.vercel.app/contact", lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    ]
}
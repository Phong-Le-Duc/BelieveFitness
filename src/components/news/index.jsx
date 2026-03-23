import { getAllNews } from "@/lib/dal/news";
import Image from "next/image";

export default async function News() {
    const news = await getAllNews();

    // console.log("News:", news);

    if (!news || !Array.isArray(news) || news.length === 0) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-gray-500">No news found</p>
            </div>
        );
    }

    return (
        <div className="">
            <h1 className="wrapper my-8" style={{ color: "var(--color-secondary)" }}>News</h1>
            {news.map((item) => (
                <article key={item.id} className="flex flex-col gap-4 rounded-sm overflow-hidden text-black wrapper mb-12">
                    <h2>{item.title}</h2>
                    {item.asset && (
                        <div className="relative w-full h-48">
                            <Image
                                src={item.asset.url}
                                alt={item.title}
                                fill
                                unoptimized
                                className="object-cover rounded"
                            />
                        </div>
                    )}
                    <p>{item.text}</p>
                </article>
            ))}
        </div>
    );
}
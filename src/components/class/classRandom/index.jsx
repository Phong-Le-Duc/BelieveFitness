import Image from "next/image";
import Link from "next/link";
import ClassRating from "@/components/class/classRating";
import { resolveAssetUrl } from "@/lib/resolveAssetUrl";

export default function ClassRandom({ classes = [] }) {
    if (!classes.length) return null;

    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    if (!randomClass || !randomClass.asset || !randomClass.asset.url) return null;

    return (
        <figure className="wrapper relative">
            <Link href={`/popular-classes/${randomClass.id}`} aria-label={randomClass.className}>
                <Image
                    src={resolveAssetUrl(randomClass.asset.url)}
                    alt={randomClass.className}
                    width={800}
                    height={600}
                    unoptimized
                    className="w-full h-70 object-cover rounded-4xl"
                />
                <div
                    className="absolute bottom-0 left-0 p-4 rounded-4xl rounded-br-none rounded-tl-none z-10"
                    style={{ backgroundColor: "var(--background-secondary)" }}
                >
                    <figcaption>{randomClass.className}</figcaption>
                    <ClassRating average={randomClass.average} count={randomClass.count} />
                </div>
            </Link>
        </figure>
    );
}



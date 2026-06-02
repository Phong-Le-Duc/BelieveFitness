import Image from "next/image";
import Link from "next/link";
import { resolveAssetUrl } from "@/lib/resolveAssetUrl";

export default function ClassCard({ classId, imageUrl, altText }) {
    return (
        <div className="shrink-0 w-60">
            <Link
                href={`/popular-classes/${classId}`}
                aria-label={altText}
            >
                <Image
                    src={resolveAssetUrl(imageUrl) || "/assets/welcome.jpg"}
                    alt={altText}
                    width={500}
                    height={400}
                    quality={65}
                    className="w-full h-48 object-cover rounded-4xl rounded-br-none"
                />
            </Link>
        </div>
    );
}
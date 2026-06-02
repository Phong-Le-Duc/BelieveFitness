import Image from "next/image";
import { resolveAssetUrl } from "@/lib/resolveAssetUrl";

export default function TrainerList({ trainers }) {
    return (
        <>
            <div className="wrapper">
                <h3 className="mt-10 mb-4 ">Popular Trainers</h3>
                <div className="flex flex-col gap-4 ">
                    {trainers.map(trainer => (
                        <div key={trainer.id} className="flex items-center min-w-fit  pb-4 last:border-b-0">
                            <Image
                                src={resolveAssetUrl(trainer.asset?.url)}
                                alt={trainer.trainerName}
                                width={58}
                                height={58}
                                unoptimized
                                className="object-cover rounded mr-4"
                                style={{ aspectRatio: '1 / 1', width: '58px', height: '58px', minWidth: '58px', minHeight: '58px', maxWidth: '58px', maxHeight: '58px' }}
                            />
                            <span className="text-lg font-medium">{trainer.trainerName}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
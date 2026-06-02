import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSingleClassById } from "@/lib/dal/classes";
import { getRatingByClassId } from "@/lib/dal/classRating";
import { getTrainerById } from "@/lib/dal/trainers";
import ClassRating from "@/components/class/classRating";
import SignUpBtn from "@/components/buttons/SignUpBtn";
import { getSingleUser } from "@/lib/dal/user";
import { cookies } from "next/headers";
import { resolveAssetUrl } from "@/lib/resolveAssetUrl";

export default async function Page({ params }) {
    const { id } = await params;

    const classItem = await getSingleClassById(id);
    if (!classItem) notFound();

    const [ratings, trainer] = await Promise.all([
        getRatingByClassId(id),
        getTrainerById(classItem.trainerId),
    ]);

    const count = ratings.length;
    const total = ratings.reduce((sum, r) => sum + Number(r.rating || 0), 0);
    const average = count ? total / count : 0;


    let isEnrolled = false;
    let isLoggedIn = false;
    let token, userId, userRole;
    try {
        const cookieStore = await cookies();
        userId = cookieStore.get("userId")?.value;
        token = cookieStore.get("token")?.value;
        if (userId && token) {
            isLoggedIn = true;
            const user = await getSingleUser(userId, token);
            userRole = user.role;
            isEnrolled = user.classes.some((c) => String(c.id) === String(classItem.id));
        }
    } catch (e) {
        console.error("Error checking enrollment status:", e);
    }

    return (
        <main className=" flex flex-col gap-4">
            <div className="relative">
                <Image
                    src={resolveAssetUrl(classItem.asset.url)}
                    alt={classItem.className}
                    width={800}
                    height={600}
                    unoptimized
                    className="w-full h-80 object-cover brightness-85"
                />
                <div
                    className="absolute bottom-10 left-4 flex flex-col gap-8"
                    style={{ color: "var(--color-secondary)" }}
                >
                    <p className="heroText">{classItem.className}</p>
                    <ClassRating average={average} count={count} style={{ color: "var(--color-secondary)" }} />
                </div>
            </div>

            <section className="wrapper flex flex-col gap-4 mb-6">
                <p>{classItem.classDay} - {classItem.classTime}</p>
                <p>{classItem.classDescription}</p>
                <h3 className="mt-4">Trainer</h3>
                {trainer && (
                    <div className="flex items-center gap-3">
                        <div className="relative w-22 h-22 overflow-hidden rounded-md shrink-0">
                            <Image
                                src={resolveAssetUrl(trainer.asset.url)}
                                alt={trainer.trainerName}
                                fill
                                unoptimized
                                className="object-cover h-auto w-auto"
                            />
                        </div>
                        <p className="font-bold">{trainer.trainerName}</p>
                    </div>
                )}
            </section>
            {isLoggedIn ? (
                userRole !== "admin" ? (
                    <div className="wrapper">
                        <SignUpBtn
                            classId={classItem.id}
                            isEnrolled={isEnrolled}
                            joinedCount={classItem.users?.length || 0}
                            maxParticipants={classItem.maxParticipants}
                        />
                    </div>
                ) : (
                    <p className="text-center text-sm text-gray-500">Admins cannot sign up for classes.</p>
                )
            ) : (
                <Link
                    href="/login"
                    className="py-2 px-4 text-black rounded-full mx-auto text-center"
                    style={{ backgroundColor: "var(--background-secondary)", display: "inline-block", maxWidth: 200 }}
                >
                    Log in to sign up
                </Link>
            )}
        </main>
    );
}
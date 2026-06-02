import { cookies } from "next/headers";
import { getSingleUser } from "@/lib/dal/user";
import Image from "next/image";
import Link from "next/link";
import { getAllClasses } from "@/lib/dal/classes";
import { getSingleClassById } from "@/lib/dal/classes";
import ParticipantsBtn from "@/components/buttons/participantsBtn";
// import CreateClassBtn from "@/components/buttons/CreateClassBtn";
import SignUpBtn from "@/components/buttons/SignUpBtn";
import { resolveAssetUrl } from "@/lib/resolveAssetUrl";

export default async function Page() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const userId = cookieStore.get("userId")?.value;

    if (!token || !userId) {
        return <main className="p-4"><p>Not logged in</p></main>;
    }

    const user = await getSingleUser(userId, token);


    const allClasses = user.role === "admin" ? await getAllClasses() : [];

    console.log("allClasses", allClasses);


    const allClassesWithUsers = await Promise.all(
        allClasses.map(async (classItem) => {
            const classDetails = await getSingleClassById(classItem.id);
            return { ...classItem, users: classDetails?.users || [] };
        })
    );

    return user.role === "admin" ? (
        <main className="wrapper flex flex-col gap-4">
            <div className="flex">
                <figure className="p-4 rounded-full" style={{ backgroundColor: "var(--background-secondary)" }}>
                    <Image src={resolveAssetUrl(user.profilePicture) || '/assets/profile_icon.png'}
                        alt={`${user.userFirstName} ${user.userLastName}`}
                        width={30} height={30}
                        className="w-8 h-8 object-cover "
                        unoptimized />
                </figure>
                <div className="ml-4 flex flex-col justify-center">
                    <p className="text-lg">{user.userFirstName} {user.userLastName}</p>
                    <p className="text-sm">{user.role === "default" ? "member" : user.role === "admin" ? "instructor" : user.role}</p>
                </div>
            </div>

            {allClasses.length === 0 ? (
                <p>No classes available.</p>
            ) : (
                <ul className="flex flex-col gap-2 ">
                    {allClassesWithUsers.map((classItem) => (
                        <li key={classItem.id} className="mb-4 p-4 border border-solid rounded-3xl">
                            <p className="text-lg font-semibold">{classItem.className}</p>
                            <p className="mt-4">{classItem.classDay} at {classItem.classTime}</p>
                            <div className="flex justify-between">
                                <p className="mt-2 text-sm">
                                    Max participants: <span className="font-bold">{classItem.maxParticipants}</span>
                                </p>
                                <p className="mt-2 text-sm">
                                    Joined: <span className="font-bold">{classItem.users.length}</span>
                                </p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <ParticipantsBtn classId={classItem.id} users={classItem.users} />
                            </div>

                        </li>
                    ))}
                </ul>
            )}
            {/* <CreateClassBtn /> */}
        </main>
    ) : (
        <main className="p-4 flex flex-col gap-4">
            <div className="flex">
                <figure className="p-4 rounded-full" style={{ backgroundColor: "var(--background-secondary)" }}>
                    <Image src={resolveAssetUrl(user.profilePicture) || '/assets/profile_icon.png'}
                        alt={`${user.userFirstName} ${user.userLastName}`}
                        width={30} height={30}
                        className="w-8 h-8 object-cover "
                        unoptimized />
                </figure>
                <div className="ml-4 flex flex-col justify-center">
                    <p className="text-lg">{user.userFirstName} {user.userLastName}</p>
                    <p className="text-sm">{user.role === "default" ? "member" : user.role === "admin" ? "instructor" : user.role}</p>
                </div>
            </div>

            {user.classes.length === 0 ? (
                <p>Not signed up to any classes yet.</p>
            ) : (
                <ul className="flex flex-col gap-2 ">
                    {user.classes.map((classItem) => (
                        <li key={classItem.id} className="mb-4  p-4 border border-solid rounded-3xl">
                            <p className="text-2xl font-semibold">{classItem.className}</p>
                            <p className="mt-4">{classItem.classDay} at {classItem.classTime}</p>
                            <div className="flex justify-between mt-4">
                                <Link
                                    href={`/popular-classes/${classItem.id}`}
                                    className="py-2 px-4 text-black rounded-full"
                                    style={{ backgroundColor: "var(--background-secondary)" }}
                                >
                                    Show Class
                                </Link>
                                <SignUpBtn
                                    className="py-2 px-4 text-black rounded-full"
                                    style={{ backgroundColor: "var(--background-secondary)" }}
                                    classId={classItem.id}
                                    isEnrolled={true}
                                    joinedCount={classItem.users?.length || 0}
                                    maxParticipants={classItem.maxParticipants}
                                >
                                    Leave
                                </SignUpBtn>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
import { cookies } from "next/headers";
import { getSingleUser } from "@/lib/dal/user";
import Image from "next/image";
import ClassMembers from "@/components/class/classMembers";
import { resolveAssetUrl } from "@/lib/resolveAssetUrl";

export default async function Page({ params }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const userId = cookieStore.get("userId")?.value;

    if (!token || !userId) {
        return <main className="p-4"><p>Not logged in</p></main>;
    }

    const user = await getSingleUser(userId, token);

    return (
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
                    <p className="text-sm">{user.role}</p>
                </div>
            </div>
            <ClassMembers />
        </main>
    );
}


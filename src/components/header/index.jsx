"use client";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import BurgerMenu from "@/components/navigation/BurgerNav";
import LoginBtn from "@/components/buttons/LoginBtn";

const TITLES = {
    "/": "Home",
    "/popular-classes": "Popular Classes",
    "/popular-classes/[id]": "Class Details",
    "/search": "Search",
    "/profile": "My Profile",
};

export default function Header({ isLoggedIn }) {
    const router = useRouter();
    const pathname = usePathname();
    const title = TITLES[pathname] || "Believe Fitness";

    const isHome = pathname === "/";
    const isDetailPage = pathname.startsWith("/popular-classes/") && pathname.split("/").length === 3;
    const headerRouteLocation = isHome || isDetailPage
        ? "fixed top-0 left-0 right-0 z-50"
        : "relative";


    const isWhiteArrow = pathname === "/" || pathname.startsWith("/popular-classes/") && pathname.split("/").length === 3;

    return (
        <header className={`px-8 flex gap-4 items-center justify-between bg-transparent w-full p-4 my-2 ${headerRouteLocation}`}>
            <div className="flex justify-around">
                <button
                    onClick={() => router.back()}
                    className="bg-none border-none cursor-pointer p-0"
                >
                    <FaArrowLeft color={isWhiteArrow ? "#fff" : undefined} />
                </button>
                {!(isHome || isDetailPage) && (
                    <span className="text-center ml-4">{title}</span>
                )}
            </div>
            <div className="flex gap-4">
                <BurgerMenu />
                {/* <LoginBtn isLoggedIn={isLoggedIn} /> */}
            </div>
        </header>
    );
}
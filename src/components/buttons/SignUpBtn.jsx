"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUpForClass, leaveClass } from "@/app/popular-classes/[id]/userAction";

export default function SignUpBtn({ classId, isEnrolled, joinedCount, maxParticipants }) {
    const [pendingAction, setPendingAction] = useState(null);
    const [error, setError] = useState(null);
    const [enrolled, setEnrolled] = useState(isEnrolled);
    const router = useRouter();

    const isFull = joinedCount >= maxParticipants;
    const isPending = pendingAction !== null;

    const handleSignUp = async () => {
        setError(null);
        setPendingAction("signup");

        try {
            await signUpForClass(classId);
            setEnrolled(true);
            router.refresh();
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setPendingAction(null);
        }
    };

    const handleLeave = async () => {
        if (!window.confirm("Leave class?")) return;
        setError(null);
        setPendingAction("leave");

        try {
            await leaveClass(classId);
            setEnrolled(false);
            router.refresh();
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setPendingAction(null);
        }
    };

    const buttonLabel = pendingAction === "signup"
        ? "Signing up..."
        : pendingAction === "leave"
            ? "Leaving..."
            : enrolled
                ? "Leave Class"
                : "SIGN UP";

    return (
        <div>
            {isFull ? (
                <div>
                    <p className="text-red-600 mt-2 text-center">All spots for this class are now occupied.</p>
                    {enrolled && (
                        <button
                            className=" py-2 px-4 text-black rounded-full w-full mt-2"
                            style={{ backgroundColor: "var(--background-secondary)" }}
                            onClick={handleLeave}
                            disabled={isPending}
                        >
                            {buttonLabel}
                        </button>
                    )}
                </div>
            ) : enrolled ? (
                <button
                    className="py-2 px-4 text-black rounded-full w-full"
                    style={{ backgroundColor: "var(--background-secondary)" }}
                    onClick={handleLeave}
                    disabled={isPending}
                >
                    {buttonLabel}
                </button>
            ) : (
                <button
                    className="py-2 px-4 text-black rounded-full w-full"
                    style={{ backgroundColor: "var(--background-secondary)" }}
                    onClick={handleSignUp}
                    disabled={isPending}
                >
                    {buttonLabel}
                </button>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

"use client";
import { useActionState } from "react";
import { loginUser } from "./login-action";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const initialState = {
    values: {
        username: "",
        password: ""
    },
    errors: undefined
};

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginUser, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            router.push("/profile");
        }
    }, [state.success, router]);

    return (
        <section className="my-8">

            <h1 className=" wrapper" style={{ color: "var(--color-secondary)" }}>Believe <br /> Fitness</h1>
            <div className="flex items-center gap-2 mt-4 mb-16"    >
                <hr style={{ border: "1px solid #000000", width: "10%" }} />
                <h3 className="">Train like a pro</h3>
            </div>

            <h3 className="wrapper mb-2">Log in with your credentials</h3>
            <form action={formAction} noValidate className=" wrapper flex flex-col gap-2 max-w-md rounded-sm">
                <div className="flex flex-col w-full">
                    <label htmlFor="username" className="mb-1 text-sm sr-only">Username:</label>
                    <input type="text"
                        name="username"
                        placeholder="Brugernavn"
                        defaultValue={state.values?.username}
                        className="bg-white border border-gray-300 text-black rounded-full px-3 py-2 focus:outline-none focus:border-blue-400" />
                    {state.errors?.username && <p style={{ color: "red" }}>{state.errors.username}</p>}
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="password" className="mb-1 text-sm sr-only">Password:</label>
                    <input type="password"
                        name="password"
                        placeholder="Password"
                        defaultValue={state.values?.password}
                        className="bg-white border border-gray-300 text-black rounded-full px-3 py-2 focus:outline-none focus:border-blue-400" />
                    {state.errors?.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
                </div>
                {state.errors?.form && <p style={{ color: "red" }}>{state.errors.form}</p>}
                <button type="submit" disabled={isPending} className="bg-blue-300 p-2 w-full mx-auto rounded-full disabled:bg-gray-400" style={{ backgroundColor: "var(--color-secondary)" }}>{isPending ? "Logging in..." : "Log ind"}</button>
            </form>
            <div className="wrapper text-center my-4 text-sm text-gray-400">
                <p>Are You not yet a Believer?</p>
                <p>
                    <a href="/sign-up" className="underline text-yellow-500 hover:text-blue-700">Sign up here</a> to start training like a pro. <br /> <i>admin: admin / password: 1234</i>
                </p>
            </div>
        </section >
    );
}
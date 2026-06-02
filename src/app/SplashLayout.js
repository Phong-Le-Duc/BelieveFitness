"use client";
import React, { useState } from "react";
import Header from "@/components/header";
import SplashScreen from "@/components/splashScreen";

export default function SplashLayout({ children, fontClass }) {
    const [splashDone, setSplashDone] = useState(false);

    return (
        <div className="site-shell">
            <div className={`${fontClass} app-shell`}>
                <SplashScreen onFinish={() => setSplashDone(true)} />
                {splashDone && (
                    <>
                        <Header />
                        {children}
                    </>
                )}
            </div>
        </div>
    );
}

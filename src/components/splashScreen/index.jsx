"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";


const SPLASH_IMAGES = [
    "/assets/splash_1.png",
    "/assets/splash_2.png"
];


export default function SplashScreen({ onFinish }) {
    const [visible, setVisible] = useState(false);
    const [buttonVisible, setButtonVisible] = useState(false);
    const [imgIdx, setImgIdx] = useState(0);

    useEffect(() => {

        if (!localStorage.getItem("splashShown")) {
            setVisible(true);
            setImgIdx(Math.floor(Math.random() * SPLASH_IMAGES.length));

            const timer = setTimeout(() => setButtonVisible(true), 700);
            return () => clearTimeout(timer);
        } else {

            onFinish?.();
        }
    }, [onFinish]);

    const handleStart = () => {
        localStorage.setItem("splashShown", "true");
        setVisible(false);
        onFinish?.();
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 w-screen h-screen bg-black flex flex-col items-center justify-center z-9999 overflow-hidden">

            <Image
                src={SPLASH_IMAGES[imgIdx]}
                alt="Splash"
                fill
                className="object-cover absolute inset-0 z-10"
                priority
            />


            <div className="absolute left-0 top-1/2  z-20 flex flex-col believe-animation   ">
                <h1 className="wrapper text-left" style={{ color: "var(--color-secondary)" }}>
                    Believe <br /> Fitness
                </h1>
                <div className="flex items-center gap-2 mt-4 mb-16 w-full trainLikeAPro-animation">
                    <hr className="border-white w-[10%] border" />
                    <h3 className="text-white">Train like a pro</h3>
                </div>
            </div>
            {buttonVisible && (
                <button
                    onClick={handleStart}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-4 py-4 text-sm font-bold rounded-full border-none cursor-pointer shadow-lg w-[50vw] animate-splashBtn "
                    style={{
                        backgroundColor: "var(--background-secondary)"

                    }}
                >
                    START TRAINING
                </button>
            )}
        </div>
    );
}


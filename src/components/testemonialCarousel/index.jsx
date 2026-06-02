"use client";

import Image from "next/image";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { useState } from "react";

export default function TestimonialCarousel({ testimonials }) {
    const [current, setCurrent] = useState(0);

    if (!testimonials || testimonials.length === 0) {
        return (
            <section className="w-full h-100 bg-amber-400 mt-8">
                <h1>Could not load testimonials</h1>
            </section>
        );
    }

    const next = () => setCurrent((current + 1) % testimonials.length);
    const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

    return (
        <section className="w-full mt-8">
            <div className="relative p-6 flex flex-col items-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/assets/testimonial_image.png"
                        alt="Testimonial background"
                        fill
                        className="object-cover"
                    />
                </div>

                <h2 className="relative z-10 text-center mb-2 text-white font-bold">A word from <br /> other believers</h2>

                <div className="relative z-10 text-white" key={current}>
                    <div className="p-4 text-center rounded fade h-48 flex flex-col items-center justify-center">
                        <p className="mt-2">"{testimonials[current].text}"</p>
                        <p className="mt-2 font-semibold">— {testimonials[current].name}</p>
                    </div>
                </div>

                <div className="relative z-10 flex gap-2">
                    <button onClick={prev} className="p-2 hover:bg-white rounded">
                        <IoChevronBackCircleOutline size={34} color="white" />
                    </button>
                    <button onClick={next} className="p-2 hover:bg-white rounded">
                        <IoChevronForwardCircleOutline size={34} color="white" />
                    </button>
                </div>
            </div>
        </section>
    );
}

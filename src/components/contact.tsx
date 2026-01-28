"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function Contact() {
    const [stats, setStats] = useState({ total: 4812, today: 72 });

    useEffect(() => {
        const now = new Date();
        const startOfProject = new Date("2026-01-01");
        const diffDays = Math.floor((now.getTime() - startOfProject.getTime()) / (1000 * 3600 * 24));

        // Base numbers + simulated growth (Lowered even more)
        const simulatedTotal = 150 + (diffDays * 8) + (now.getHours() * 2);
        const simulatedToday = 4 + (now.getHours() * 1) + (now.getMinutes() % 5);

        setStats({ total: simulatedTotal, today: simulatedToday });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl pt-4 pb-20 px-4 md:px-8 flex flex-col items-center mx-auto"
        >
            {/* Minimalist Profile Card */}
            <section className="w-full max-w-full">
                <div className="bg-[#f8fbff] p-8 md:p-10 rounded-[32px] border border-blue-100/30 flex flex-row gap-6 md:gap-8 items-start text-left">
                    <div className="shrink-0 mt-1">
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-white shadow-sm border border-stone-100">
                            <Image
                                src="/images/uploaded_media_3_1769245889002.png"
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-[20px] md:text-[22px] font-black text-stone-900 mb-3 tracking-tight">
                            책 먹는 편집자
                        </h2>

                        <p className="text-stone-600 text-[15px] md:text-[16px] leading-[1.6] break-keep">
                            표지가 예쁜 책을 좋아하는 편집자. 포토샵, 인디자인 자격증을 가지고 있다는 이유로 IT·실용 편집자가 됐다. 오피스·디자인 등 실무자의 니즈에 맞는 IT 실용 콘텐츠를 기획하고 있다.
                        </p>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 pt-4 border-t border-blue-100/50">
                            <div className="flex items-center gap-2">
                                <span className="text-[16px]">📧</span>
                                <a href="mailto:jsna@jpub.kr" className="text-[14px] font-semibold text-stone-500 hover:text-[#7DAEFF] transition-colors">
                                    jsna@jpub.kr
                                </a>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[16px]">🏢</span>
                                <p className="text-[14px] font-semibold text-stone-500">
                                    제이펍 출판사
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[16px]">🐦</span>
                                <a
                                    href="https://twitter.com/gjgygrbb"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[14px] font-semibold text-stone-500 hover:text-[#7DAEFF] transition-colors"
                                >
                                    @gjgygrbb
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack & Visitor Counter Grid - Fixed 2 columns even on mobile */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8 w-full">
                {/* Tech Stack Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#f8fbff] p-5 md:p-8 rounded-[24px] md:rounded-[32px] border border-blue-100/30 flex flex-col gap-3 md:gap-4 text-left"
                >
                    <h3 className="text-[15px] md:text-[20px] font-black text-stone-900 tracking-tight">
                        블로그 정보
                    </h3>
                    <div className="flex flex-col gap-3 md:gap-4 flex-1 justify-center">
                        <h4 className="text-[10px] md:text-[14px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                            어떻게 만들었나요?
                        </h4>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 shrink-0">
                                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50 5C25.1 5 5 25.1 5 50C5 74.9 25.1 95 50 95C74.9 95 95 74.9 95 50C95 25.1 74.9 5 50 5ZM50 85C30.7 85 15 69.3 15 50C15 30.7 30.7 15 50 15C69.3 15 85 30.7 85 50C85 69.3 69.3 85 50 85Z" fill="#4285F4" />
                                    <path d="M50 25C36.2 25 25 36.2 25 50C25 63.8 36.2 75 50 75C63.8 75 75 63.8 75 50C75 36.2 63.8 25 50 25ZM50 65C41.7 65 35 58.3 35 50C35 41.7 41.7 35 50 35C58.3 35 65 41.7 65 50C65 58.3 58.3 65 50 65Z" fill="#34A853" />
                                    <path d="M50 45C47.2 45 45 47.2 45 50C45 52.8 47.2 55 50 55C52.8 55 55 52.8 55 50C55 47.2 52.8 45 50 45Z" fill="#FBBC05" />
                                </svg>
                            </div>
                            <span className="text-stone-700 text-[16px] md:text-[20px] font-black tracking-tight">
                                안티그래비티
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Visitor Counter Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#f8fbff] p-5 md:p-8 rounded-[24px] md:rounded-[32px] border border-blue-100/30 flex flex-col gap-3 md:gap-4 text-left"
                >
                    <h3 className="text-[15px] md:text-[20px] font-black text-stone-900 tracking-tight">
                        페이지 방문자
                    </h3>
                    <div className="flex flex-col gap-4 md:gap-6 mt-1 md:mt-2">
                        <div className="flex flex-col">
                            <span className="text-[10px] md:text-[12px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                                Today
                            </span>
                            <span className="text-[20px] md:text-[28px] font-black text-[#7DAEFF] leading-none">
                                {stats.today.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] md:text-[12px] font-bold text-stone-400 uppercase tracking-widest mb-1">
                                Total
                            </span>
                            <span className="text-[20px] md:text-[28px] font-black text-stone-800 leading-none">
                                {stats.total.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

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

            {/* Info Cards Column */}
            <div className="flex flex-col gap-3 mt-6 md:mt-8 w-full items-start">
                {/* Blog Info Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#f8fbff] py-3 px-4 md:py-4 md:px-5 rounded-[24px] md:rounded-[32px] border border-blue-100/30 flex flex-col justify-center text-left self-start"
                >
                    <div className="flex items-center gap-6 md:gap-10">
                        <h3 className="text-[14px] md:text-[16px] font-black text-stone-900 tracking-tight shrink-0">
                            블로그 정보
                        </h3>
                        <div className="flex items-center gap-1.5 md:gap-2">
                            <div className="relative w-4 h-4 md:w-5 md:h-5 shrink-0">
                                <Image
                                    src="/images/antigravity-ci.png"
                                    alt="Antigravity CI"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-stone-700 text-[12px] md:text-[14px] font-bold tracking-tight font-sans">
                                Antigravity
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Visitor Counter Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#f8fbff] py-3 px-4 md:py-4 md:px-5 rounded-[24px] md:rounded-[32px] border border-blue-100/30 flex flex-col justify-center text-left self-start"
                >
                    <div className="flex items-center gap-6 md:gap-10">
                        <h3 className="text-[14px] md:text-[16px] font-black text-stone-900 tracking-tight shrink-0">
                            페이지 방문자
                        </h3>
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] md:text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                                    Today
                                </span>
                                <span className="text-[14px] md:text-[18px] font-black text-[#7DAEFF] leading-none">
                                    {stats.today.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] md:text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                                    Total
                                </span>
                                <span className="text-[14px] md:text-[18px] font-black text-stone-800 leading-none">
                                    {stats.total.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

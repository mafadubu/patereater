"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, Building2, Twitter } from "lucide-react"

export function Contact() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl pt-24 pb-20 px-8 lg:px-12 flex justify-center"
        >
            {/* Minimalist Profile Card inspired by reference image */}
            <section className="w-full max-w-full">
                <div className="bg-[#f8fbff] p-8 md:p-10 rounded-[32px] border border-blue-100/30 flex flex-row gap-6 md:gap-8 items-start text-left">
                    {/* Circle Profile Image - Smaller size */}
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
                        {/* Title/Name */}
                        <h2 className="text-[20px] md:text-[22px] font-black text-stone-900 mb-3 tracking-tight">
                            책 먹는 편집자
                        </h2>

                        {/* Introduction - Continuous text */}
                        <p className="text-stone-600 text-[15px] md:text-[16px] leading-[1.6] break-keep">
                            표지가 예쁜 책을 좋아하는 편집자. 포토샵, 인디자인 자격증을 가지고 있다는 이유로 IT·실용 편집자가 됐다. 오피스·디자인 등 실무자의 니즈에 맞는 IT 실용 콘텐츠를 기획하고 있다.
                        </p>

                        {/* Contact Info Row */}
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
        </motion.div>
    )
}

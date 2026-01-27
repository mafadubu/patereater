"use client"

import { motion } from "framer-motion"
import { Scene } from "./scene"
import Image from "next/image"

interface BookDetailViewProps {
    book: {
        id: string
        title: string
        subtitle?: string
        author?: string
        description?: string
        color: string
        category?: string
        publishDate?: string
        publisher?: string
        pages?: string
        design?: string
        designLink?: string
        binding?: string
        isbn?: string
        year?: string
        image?: string
        backImage?: string
        spineImage?: string
        width?: number
        height?: number
        depth?: number
        links?: {
            yes24?: string
            kyobo?: string
            aladin?: string
        }
    }
    onClose: () => void
}

export function BookDetailView({ book, onClose }: BookDetailViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full min-h-[calc(100vh-180px)] bg-white flex flex-col pt-4 relative"
        >
            {/* Minimalist Circular Back Button */}
            <button
                onClick={onClose}
                className="absolute top-8 left-8 z-50 flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-md rounded-full border border-stone-100 shadow-sm text-stone-600 hover:text-stone-900 hover:border-stone-200 transition-all hover:scale-105 group"
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:-translate-x-0.5"><path d="m15 18-6-6 6-6" /></svg>
            </button>

            <div className="flex flex-col w-full">
                {/* Top Section: Side-by-Side */}
                <div className="flex flex-col lg:flex-row w-full bg-white">
                    {/* Left side: 3D View - Seamless white background */}
                    <div className="w-full lg:w-[55%] aspect-square lg:aspect-auto lg:h-[70vh] flex items-center justify-center relative bg-white">
                        <Scene
                            color={book.color}
                            image={book.image}
                            backImage={book.backImage}
                            spineImage={book.spineImage}
                            dimensions={book.width && book.height && book.depth ? [book.width, book.height, book.depth] : undefined}
                        />
                    </div>

                    {/* Right side: Book Main Info */}
                    <div className="w-full lg:w-[45%] p-8 lg:p-16 lg:pl-0 flex flex-col items-start text-left">
                        <span className="text-[12px] font-medium text-stone-400 mb-2 uppercase tracking-widest">
                            {book.category || "category"}
                        </span>

                        <div className="mb-6 w-full max-w-md">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 leading-[1.1] line-clamp-2">
                                {book.title}
                            </h2>
                            {book.subtitle && (
                                <p className="text-[14px] font-medium text-stone-400 mt-2 leading-snug line-clamp-2">
                                    {book.subtitle}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 w-full max-w-md">
                            <div>
                                <p className="text-[16px] font-bold text-stone-900">{book.author}</p>
                            </div>

                            <div>
                                <p className="text-[13px] font-medium text-stone-500">
                                    {book.publishDate || `${book.year || '2025'}년 10월 21일`}
                                </p>
                            </div>

                            <div className="mt-1">
                                <p className="text-stone-800 text-[14px] leading-relaxed">
                                    {book.description || "이 책에 대한 소개 글이 여기에 들어갑니다. 매주 화요일, 다섯 번의 연제 이후 단행본이 출간될 예정입니다."}
                                </p>
                            </div>

                            {/* Bookstore Logos */}
                            <div className="flex items-center gap-3 mt-4">
                                <a
                                    href={book.links?.yes24 || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 relative rounded-lg overflow-hidden border border-stone-100 hover:border-stone-300 transition-colors bg-white shadow-sm"
                                >
                                    <Image src="/images/logos/yes24.png" alt="YES24" fill className="object-cover" />
                                </a>
                                <a
                                    href={book.links?.kyobo || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 relative rounded-lg overflow-hidden border border-stone-100 hover:border-stone-300 transition-colors bg-white shadow-sm"
                                >
                                    <Image src="/images/logos/kyobo.png" alt="교보문고" fill className="object-cover" />
                                </a>
                                <a
                                    href={book.links?.aladin || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 relative rounded-lg overflow-hidden border border-stone-100 hover:border-stone-300 transition-colors bg-white shadow-sm"
                                >
                                    <Image src="/images/logos/aladin.png" alt="알라딘" fill className="object-cover" />
                                </a>
                            </div>

                            {/* 제작 세부 정보 */}
                            <div className="mt-8 space-y-4 pt-6 border-t border-stone-100">
                                <h3 className="text-[14px] font-bold text-stone-900">제작 세부 정보</h3>
                                <div className="grid grid-cols-3 gap-y-6 gap-x-4 text-[13px]">
                                    <div>
                                        <p className="text-stone-400 font-medium mb-1 tracking-tighter text-[11px]">출판사</p>
                                        <p className="text-stone-900 font-bold">{book.publisher || '제이펍'}</p>
                                    </div>
                                    <div>
                                        <p className="text-stone-400 font-medium mb-1 tracking-tighter text-[11px]">판형</p>
                                        <p className="text-stone-900 font-bold whitespace-nowrap">{book.width} × {book.height}mm</p>
                                    </div>
                                    <div>
                                        <p className="text-stone-400 font-medium mb-1 tracking-tighter text-[11px]">쪽수</p>
                                        <p className="text-stone-900 font-bold">{book.pages || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-stone-400 font-medium mb-1 tracking-tighter text-[11px]">디자인</p>
                                        {book.designLink ? (
                                            <a
                                                href={book.designLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-stone-900 font-bold hover:text-[#7DAEFF] transition-colors"
                                            >
                                                {book.design}
                                            </a>
                                        ) : (
                                            <p className="text-stone-900 font-bold">{book.design || '-'}</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-stone-400 font-medium mb-1 tracking-tighter text-[11px]">제본</p>
                                        <p className="text-stone-900 font-bold">{book.binding || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-stone-400 font-medium mb-1 tracking-tighter text-[11px]">ISBN</p>
                                        <p className="text-stone-900 font-bold">{book.isbn || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

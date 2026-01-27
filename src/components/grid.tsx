import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface BookData {
    id: string
    title: string
    subtitle?: string
    author: string
    category?: string
    description?: string
    color: string
    image?: string
    backImage?: string
    spineImage?: string
    width?: number // mm
    height?: number // mm
    depth?: number // mm
}

interface GridProps {
    books: BookData[]
    onSelect: (book: BookData) => void
}

export function Grid({ books, onSelect }: GridProps) {
    const [isMobile, setIsMobile] = useState(false)
    const SCALE = 1.15

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (isMobile) {
        return (
            <div className="w-full bg-[#BFD5F2] pt-6 pb-12 px-4 min-h-screen">
                <div className="grid grid-cols-2 gap-x-4 gap-y-10 w-full">
                    {books.map((book) => {
                        return (
                            <motion.div
                                key={book.id}
                                onClick={() => onSelect(book)}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center select-none"
                            >
                                <div className="relative w-full aspect-[1/1.4] bg-white shadow-xl rounded-sm overflow-hidden">
                                    {book.image ? (
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="p-3 h-full flex flex-col justify-between bg-white text-stone-900">
                                            <h3 className="font-bold text-[11px] leading-tight tracking-tight">{book.title}</h3>
                                            <p className="text-[9px] text-stone-400 font-medium uppercase tracking-widest">{book.author}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-3 text-center w-full px-1">
                                    <h4 className="font-black text-[13px] text-stone-900 line-clamp-1">
                                        {book.title}
                                    </h4>
                                    <p className="text-[10px] text-stone-700/60 font-bold mt-0.5">
                                        {book.author}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full pt-0 pb-12 px-6">
            <div className="flex flex-wrap justify-start items-end gap-x-6 gap-y-10 w-full mx-auto">
                {books.map((book) => {
                    const w_mm = book.width || 150
                    const h_mm = book.height || 220
                    const w_px = w_mm * SCALE
                    const h_px = h_mm * SCALE

                    return (
                        <motion.div
                            key={book.id}
                            onClick={() => onSelect(book)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover="hover"
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="group cursor-pointer flex flex-col items-center flex-shrink-0 select-none outline-none relative"
                            style={{ width: w_px }}
                        >
                            <div
                                className="relative bg-white border border-stone-100 shadow-sm transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl origin-bottom overflow-hidden rounded-sm"
                                style={{
                                    width: w_px,
                                    height: h_px,
                                }}
                            >
                                {book.image && (
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-[0.7]"
                                    />
                                )}
                                {!book.image && (
                                    <div className="p-4 h-full flex flex-col justify-between text-stone-900 bg-stone-50 transition-all duration-700 group-hover:brightness-[0.9]">
                                        <h3 className="font-bold text-sm leading-tight tracking-tight">{book.title}</h3>
                                        <p className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">{book.author}</p>
                                    </div>
                                )}
                                <motion.div
                                    className="absolute inset-0 bg-stone-900/60 z-20 flex items-center justify-center p-6 overflow-hidden"
                                    initial={{ opacity: 0 }}
                                    variants={{
                                        hover: { opacity: 1 }
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="border-2 border-white px-6 py-2.5 hover:bg-white hover:text-stone-900 transition-colors">
                                        <span className="text-white font-bold text-[15px] uppercase tracking-wider">
                                            살펴보기
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}




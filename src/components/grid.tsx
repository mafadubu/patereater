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
    const FEATURE_SCALE_DESKTOP = 2.5
    const FEATURE_SCALE_MOBILE = 1.8

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    if (!books || books.length === 0) return null

    const featuredBook = books[0]
    const remainingBooks = books.slice(1)

    // Helper render function for featured book
    const renderFeaturedSection = () => {
        const w = featuredBook.width || 150
        const h = featuredBook.height || 220
        const scale = isMobile ? FEATURE_SCALE_MOBILE : FEATURE_SCALE_DESKTOP
        const w_px = w * scale
        const h_px = h * scale

        return (
            <div className="w-full flex flex-col items-center mb-24 md:mb-32">
                <motion.div
                    onClick={() => onSelect(featuredBook)}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="cursor-pointer group flex flex-col items-center"
                >
                    <div
                        className="relative bg-white shadow-2xl rounded-sm overflow-hidden mb-12"
                        style={{ width: w_px, height: h_px }}
                    >
                        {featuredBook.image ? (
                            <img
                                src={featuredBook.image}
                                alt={featuredBook.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="p-8 h-full flex flex-col justify-between bg-stone-50">
                                <h3 className="font-bold text-2xl leading-tight text-stone-900">{featuredBook.title}</h3>
                                <p className="text-sm font-medium text-stone-400 uppercase tracking-widest">{featuredBook.author}</p>
                            </div>
                        )}
                    </div>

                    {/* Featured Book Title Area - Optionally show if desired, but image focus is better based on reference */}
                    {/* <div className="text-center mt-6">
                        <h2 className="text-xl md:text-2xl font-black text-stone-900 mb-2">{featuredBook.title}</h2>
                        <p className="text-stone-500 font-bold">{featuredBook.author}</p>
                    </div> */}
                </motion.div>

                {/* Visual Connector or Spacing */}
                <div className="w-full h-px bg-stone-100 max-w-4xl mt-12 mb-12 opacity-50" />
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className="w-full bg-white pt-12 pb-20 px-4">
                {renderFeaturedSection()}
                <div className="grid grid-cols-2 gap-x-4 gap-y-12 w-full bg-white">
                    {remainingBooks.map((book) => {
                        const ratio = (book.height || 220) / (book.width || 150)
                        return (
                            <motion.div
                                key={book.id}
                                onClick={() => onSelect(book)}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center select-none"
                            >
                                <div
                                    className="relative w-full bg-white shadow-lg rounded-sm overflow-hidden border border-stone-100"
                                    style={{ aspectRatio: `1 / ${ratio}` }}
                                >
                                    {book.image ? (
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="p-3 h-full flex flex-col justify-between bg-white text-stone-900">
                                            <h3 className="font-bold text-[10px] leading-tight tracking-tight">{book.title}</h3>
                                            <p className="text-[8px] text-stone-400 font-medium uppercase tracking-widest">{book.author}</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full pt-16 pb-24 px-6 max-w-7xl mx-auto">
            {renderFeaturedSection()}
            <div className="flex flex-wrap justify-center items-end gap-x-10 gap-y-16 w-full mx-auto">
                {remainingBooks.map((book) => {
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




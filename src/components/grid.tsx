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
        return <VaultSlider books={books} onSelect={onSelect} />
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

function VaultSlider({ books, onSelect }: GridProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollXProgress } = useScroll({
        container: containerRef,
    })

    return (
        <div className="relative w-full overflow-hidden pt-10 pb-20">
            {/* Background "Dial" effect - subtle */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-stone-100 -translate-y-1/2 pointer-events-none" />

            <div
                ref={containerRef}
                className="flex items-end gap-0 overflow-x-auto snap-x snap-mandatory no-scrollbar px-[40vw]"
                style={{ scrollPadding: "0 40vw" }}
            >
                {books.map((book, idx) => (
                    <VaultItem
                        key={book.id}
                        book={book}
                        onSelect={onSelect}
                        containerRef={containerRef}
                    />
                ))}
            </div>

            {/* Helper label */}
            <div className="text-center mt-8 px-10">
                <p className="text-[12px] font-bold text-stone-400 uppercase tracking-[0.2em]">
                    ← Slide to choose →
                </p>
            </div>
        </div>
    )
}

function VaultItem({ book, onSelect, containerRef }: { book: BookData, onSelect: any, containerRef: any }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollXProgress } = useScroll({
        container: containerRef,
        target: ref,
        offset: ["start end", "end start"]
    })

    // Scale and Opacity based on distance from center
    // We want it to be 1.25 when in center, and 0.7 when on sides
    // offset: ["start end", "end start"] means:
    // 0: item's start is at container's end (just entering right)
    // 0.5: item is in middle
    // 1: item's end is at container's start (just leaving left)

    const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.7, 1.2, 0.7])
    const opacity = useTransform(scrollXProgress, [0, 0.3, 0.5, 0.7, 1], [0.3, 0.6, 1, 0.6, 0.3])
    const rotateY = useTransform(scrollXProgress, [0, 0.5, 1], [45, 0, -45])
    const zIndex = useTransform(scrollXProgress, [0, 0.5, 1], [1, 10, 1])

    return (
        <motion.div
            ref={ref}
            onClick={() => onSelect(book)}
            style={{
                scale,
                opacity,
                rotateY,
                zIndex,
                perspective: "1000px"
            }}
            className="flex-shrink-0 snap-center cursor-pointer py-10 px-4"
        >
            <div
                className="relative bg-white shadow-2xl rounded-sm overflow-hidden"
                style={{
                    width: (book.width || 150) * 0.8,
                    height: (book.height || 220) * 0.8
                }}
            >
                {book.image ? (
                    <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="p-4 h-full flex flex-col justify-between bg-stone-50">
                        <h3 className="font-bold text-xs">{book.title}</h3>
                        <p className="text-[8px] text-stone-400 uppercase">{book.author}</p>
                    </div>
                )}
            </div>

            {/* Title appears below when centered */}
            <motion.div
                style={{ opacity: useTransform(scrollXProgress, [0.4, 0.5, 0.6], [0, 1, 0]) }}
                className="absolute left-1/2 -translate-x-1/2 bottom-[-40px] w-[200px] text-center"
            >
                <h4 className="font-black text-[14px] text-stone-900 whitespace-nowrap overflow-hidden text-ellipsis">
                    {book.title}
                </h4>
                <p className="text-[10px] text-stone-400 font-medium">
                    {book.author}
                </p>
            </motion.div>
        </motion.div>
    )
}


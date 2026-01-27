import { motion } from "framer-motion"
import Image from "next/image"
import postsData from "@/data/posts.json"

interface PostData {
    id: string
    title: string
    category: string
    imagePath?: string
    width?: number
    height?: number
}

const posts: PostData[] = postsData as PostData[]

export function Posts() {
    const SCALE = 1.15

    return (
        <div className="w-full pt-10 pb-20 px-6">
            <div className="mb-16">
                <p className="text-stone-400 font-medium text-[15px] tracking-tight">포스팅이 곧 추가될 예정입니다.</p>
            </div>
            <div className="flex flex-wrap justify-start items-end gap-x-6 gap-y-12">
                {posts.map((post) => {
                    const w_px = (post.width || 150) * SCALE
                    const h_px = (post.height || 220) * SCALE

                    return (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
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
                                {/* Card Body - Clean surface or Real Image */}
                                <div className="absolute inset-0 bg-stone-100 transition-all duration-700 group-hover:scale-110 group-hover:brightness-[0.9]">
                                    {post.imagePath ? (
                                        <Image
                                            src={post.imagePath}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Info below card - Left aligned */}
                            <div className="mt-4 w-full text-left px-1">
                                <h3 className="text-[13px] font-bold text-stone-900 leading-tight mb-1 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-[11px] font-black text-stone-400 uppercase tracking-widest">
                                    {post.category}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

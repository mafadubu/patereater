"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import { Grid } from "@/components/grid"
import { Posts } from "@/components/posts"
import { Contact } from "@/components/contact"
import { BookDetailView } from "@/components/book-detail-view"
import books from "@/data/books.json"
import posts from "@/data/posts.json"

function PortfolioContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState<"Home" | "Posting" | "Contact">("Home")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedWorkType, setSelectedWorkType] = useState<"All" | "기획·제작" | "제작">("All")
  const [selectedYear, setSelectedYear] = useState("All")
  const [selectedPublisher, setSelectedPublisher] = useState("All")
  const [isHomeHovered, setIsHomeHovered] = useState(false)

  // Sync selectedBook with URL ?book=id
  useEffect(() => {
    const bookId = searchParams.get("book")
    if (bookId) {
      // Look in both Home books and Posting posts
      const foundBook = (books as any[]).find(b => b.id === bookId) || (posts as any[]).find(p => p.id === bookId)
      if (foundBook) {
        setSelectedBook(foundBook)
      }
    } else {
      setSelectedBook(null)
    }
  }, [searchParams])

  const handleSelect = (book: any) => {
    // Only navigate. The useEffect will catch the URL change and update selectedBook state.
    // This ensures that the URL and component state are always in sync, making 
    // the browser's Back/Forward buttons work as expected.
    router.push(`?book=${book.id}`)
  }

  const handleClose = () => {
    // Navigate back. The useEffect will handle setting selectedBook to null.
    router.back()
  }

  const toggleDropdown = (section: string) => {
    setActiveDropdown(activeDropdown === section ? null : section)
  }

  // Floating Header Scroll Animations
  const { scrollY } = useScroll()

  // Maps scroll from 0-100 to background height and style
  const headerBgHeight = useTransform(scrollY, [0, 80], ["36px", "60px"])
  const headerBgOpacity = useTransform(scrollY, [0, 80], [1, 1])
  const headerPaddingTop = useTransform(scrollY, [0, 80], ["48px", "12px"])

  // Smooth out transitions
  const smoothHeight = useSpring(headerBgHeight, { stiffness: 220, damping: 32 })
  const smoothPaddingTop = useSpring(headerPaddingTop, { stiffness: 220, damping: 32 })

  // Track scroll state for reactive UI changes (like font-weight)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", updateScroll)
    return () => window.removeEventListener("scroll", updateScroll)
  }, [])

  return (
    <main className="flex min-h-screen flex-col bg-white text-stone-900 font-sans">
      {/* Sticky Container for Header Logic */}
      <div className="sticky top-0 z-[100] w-full">
        {/* Animated Background that expands from the color bar */}
        <motion.div
          className="absolute inset-0 bg-[#BFD5F2] origin-top"
          style={{
            height: smoothHeight,
            opacity: headerBgOpacity,
          }}
        />

        {/* Paper Texture Overlay on the background */}
        <div className="absolute inset-0 opacity-[0.1] mix-blend-multiply pointer-events-none overflow-hidden"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>

        <motion.header
          className="relative w-full px-4 md:px-8 pb-4 flex flex-col items-start gap-4"
          style={{ paddingTop: smoothPaddingTop }}
        >
          <div className="flex flex-nowrap items-baseline gap-4 md:gap-10 w-full relative overflow-x-auto no-scrollbar">
            <h1 className="font-black text-[15px] md:text-[22px] whitespace-nowrap tracking-tight text-stone-900 shrink-0">
              책 먹는 편집자의 블로그
            </h1>

            <nav className="flex items-center gap-3 md:gap-8 md:ml-4 shrink-0">
              <div
                className="relative group"
                onMouseEnter={() => setIsHomeHovered(true)}
                onMouseLeave={() => setIsHomeHovered(false)}
              >
                <button
                  onClick={() => {
                    setCurrentTab("Home")
                    router.push("/")
                  }}
                  className={`text-[13px] md:text-[17px] whitespace-nowrap transition-all cursor-pointer pb-1 relative 
                    ${!scrolled || currentTab === "Home" ? "font-black text-stone-800" : "font-normal text-black"}
                  `}
                >
                  편집한 책
                </button>

                {/* Submenu Dropdown */}
                <AnimatePresence>
                  {isHomeHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[200px]"
                    >
                      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-stone-100 p-2 flex flex-col gap-1">
                        {[
                          { label: "전체", value: "All" },
                          { label: "기획·제작", value: "기획·제작" },
                          { label: "제작", value: "제작" }
                        ].map((item) => (
                          <button
                            key={item.value}
                            onClick={() => {
                              setCurrentTab("Home")
                              setSelectedWorkType(item.value as any)
                              // Clean up URL and state
                              router.push("/")
                              setIsHomeHovered(false)
                            }}
                            className={`px-4 py-2.5 text-center text-[14px] font-bold rounded-lg transition-all ${selectedWorkType === item.value && currentTab === "Home" ? "bg-[#BFD5F2]/10 text-[#7DAEFF]" : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"}`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => {
                  setCurrentTab("Posting")
                  router.push("/")
                }}
                className={`text-[13px] md:text-[17px] whitespace-nowrap transition-all cursor-pointer pb-1 relative 
                  ${!scrolled || currentTab === "Posting" ? "font-black text-stone-800" : "font-normal text-black"}
                `}
              >
                포스팅
              </button>
              <button
                onClick={() => {
                  setCurrentTab("Contact")
                  router.push("/")
                }}
                className={`text-[13px] md:text-[17px] whitespace-nowrap transition-all cursor-pointer pb-1 relative 
                  ${!scrolled || currentTab === "Contact" ? "font-black text-stone-800" : "font-normal text-black"}
                `}
              >
                소개·연락처
              </button>
            </nav>
          </div>
        </motion.header>
      </div>

      <div className="w-full px-8">
        {/* Notion-Style Filter Dashboard - Only show when no book is selected */}
        {currentTab === "Home" && !selectedBook && (
          <div className="flex flex-wrap items-center gap-2 text-[13px] w-full pt-1 pb-1 relative border-t border-black/5">
            {/* Click-away backdrop */}
            {activeDropdown && (
              <div
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setActiveDropdown(null)}
              />
            )}
            <div className="text-stone-400 font-semibold mr-4 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4" /><path d="M17 20V4" /><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /></svg>
              Sort
            </div>

            {/* 분야 (카테고리) */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("카테고리")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-stone-50 transition-colors border border-stone-100"
              >
                <span className="text-stone-400 font-medium">분야</span>
                <span className="font-bold text-stone-700">{selectedCategory}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 transition-transform ${activeDropdown === "카테고리" ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <AnimatePresence>
                {activeDropdown === "카테고리" && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute left-0 mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-xl z-50 p-1.5"
                  >
                    <div className="flex flex-col gap-0.5">
                      {["All", "AI", "디자인", "취미", "오피스"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSelectedCategory(opt)
                            setActiveDropdown(null)
                          }}
                          className={`px-3 py-1.5 text-left rounded-md hover:bg-stone-100 transition-colors font-medium ${selectedCategory === opt ? "text-[#BFD5F2] font-bold" : "text-stone-700"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 연도 */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("연도")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-stone-50 transition-colors border border-stone-100"
              >
                <span className="text-stone-400 font-medium">연도</span>
                <span className="font-bold text-stone-700">{selectedYear}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 transition-transform ${activeDropdown === "연도" ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <AnimatePresence>
                {activeDropdown === "연도" && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute left-0 mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-xl z-50 p-1.5"
                  >
                    <div className="flex flex-col gap-0.5">
                      {["All", "2026", "2025", "2024", "2023"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSelectedYear(opt)
                            setActiveDropdown(null)
                          }}
                          className={`px-3 py-1.5 text-left rounded-md hover:bg-stone-100 transition-colors font-medium ${selectedYear === opt ? "text-[#7DAEFF] font-bold" : "text-stone-700"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 출판사 */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("출판사")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-stone-50 transition-colors border border-stone-100"
              >
                <span className="text-stone-400 font-medium">출판사</span>
                <span className="font-bold text-stone-700">{selectedPublisher}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 transition-transform ${activeDropdown === "출판사" ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
              </button>
              <AnimatePresence>
                {activeDropdown === "출판사" && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute left-0 mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-xl z-50 p-1.5"
                  >
                    <div className="flex flex-col gap-0.5">
                      {["All", "제이펍"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            setSelectedPublisher(opt)
                            setActiveDropdown(null)
                          }}
                          className={`px-3 py-1.5 text-left rounded-md hover:bg-stone-100 transition-colors font-medium ${selectedPublisher === opt ? "text-[#7DAEFF] font-bold" : "text-stone-700"}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-1" />
          </div>
        )}

        {currentTab === "Posting" && !selectedBook && (
          <div className="flex items-center gap-3 text-[13px] w-full pt-1">
            <div className="text-stone-400 font-semibold mr-4 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4" /><path d="M17 20V4" /><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /></svg>
              Sort
            </div>

            <button className="text-stone-700 font-bold px-3 py-1.5 rounded-md border border-stone-100 bg-stone-50 transition-colors">전체</button>
            <button className="text-stone-400 font-semibold px-3 py-1.5 rounded-md border border-stone-100 hover:bg-stone-50 transition-colors">월간 표1</button>
            <button className="text-stone-400 font-semibold px-3 py-1.5 rounded-md border border-stone-100 hover:bg-stone-50 transition-colors">편집</button>
            <button className="text-stone-400 font-semibold px-3 py-1.5 rounded-md border border-stone-100 hover:bg-stone-50 transition-colors">책</button>
            <button className="text-stone-400 font-semibold px-3 py-1.5 rounded-md border border-stone-100 hover:bg-stone-50 transition-colors">음악</button>

            <div className="flex-1" />
          </div>
        )}
      </div>

      <section className="w-full flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedBook ? (
            <BookDetailView
              key="detail"
              book={selectedBook}
              onClose={handleClose}
            />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              {currentTab === "Home" && (
                <Grid
                  books={books.filter(b => {
                    const matchesCategory = selectedCategory === "All" || b.category === selectedCategory;
                    const matchesWorkType = selectedWorkType === "All" || (b as any).workType === selectedWorkType;
                    const matchesYear = selectedYear === "All" || (b as any).year === selectedYear || b.publishDate?.startsWith(selectedYear);
                    const matchesPublisher = selectedPublisher === "All" || b.publisher === selectedPublisher;
                    return matchesCategory && matchesWorkType && matchesYear && matchesPublisher;
                  })}
                  onSelect={handleSelect}
                />
              )}

              {currentTab === "Posting" && (
                <Posts />
              )}

              {currentTab === "Contact" && (
                <Contact />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main >
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <PortfolioContent />
    </Suspense>
  )
}

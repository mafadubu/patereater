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

  // Floating Header Scroll Logic Removed
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", updateScroll)
    return () => window.removeEventListener("scroll", updateScroll)
  }, [])

  return (
    <main className="flex min-h-screen flex-col bg-white text-stone-900 font-sans">
      {/* Sticky Container for Header Logic */}
      <div className="sticky top-0 z-[100] w-full bg-white/95 backdrop-blur-sm">
        <header className="relative w-full border-b border-black/10">
          <div className="flex items-stretch w-full h-[52px] md:h-[72px]">
            {/* Title Block - Left */}
            <div className="flex items-center px-4 md:px-8 h-full">
              <h1
                className="font-black text-[14px] md:text-[22px] whitespace-nowrap tracking-tight text-stone-900 cursor-pointer"
                onClick={() => {
                  setCurrentTab("Home")
                  router.push("/")
                }}
              >
                책 먹는 편집자
              </h1>
            </div>

            {/* Navigation Block */}
            <nav className="flex items-center justify-start px-4 md:px-8 gap-4 md:gap-10 min-w-0">
              <div
                className="relative group h-full flex items-center"
                onMouseEnter={() => setIsHomeHovered(true)}
                onMouseLeave={() => setIsHomeHovered(false)}
              >
                <button
                  onClick={() => {
                    setCurrentTab("Home")
                    router.push("/")
                  }}
                  className={`text-[12px] md:text-[17px] whitespace-nowrap transition-all cursor-pointer relative py-2
                    ${currentTab === "Home" ? "font-black text-stone-800" : "font-normal text-stone-500 hover:text-stone-900"}
                  `}
                >
                  편집한 책
                </button>

                {/* Submenu Dropdown */}
                <AnimatePresence>
                  {isHomeHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full left-0 pt-0 z-50 min-w-[200px]"
                    >
                      <div className="bg-white shadow-2xl border-x border-b border-stone-200 flex flex-col overflow-hidden">
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
                              router.push("/")
                              setIsHomeHovered(false)
                            }}
                            className={`px-4 py-3 text-left text-[13px] md:text-[14px] font-bold transition-all border-b border-stone-50 last:border-b-0 ${selectedWorkType === item.value && currentTab === "Home" ? "bg-stone-50 text-stone-900" : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"}`}
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
                className={`text-[12px] md:text-[17px] whitespace-nowrap transition-all cursor-pointer relative py-2
                  ${currentTab === "Posting" ? "font-black text-stone-800" : "font-normal text-stone-500 hover:text-stone-900"}
                `}
              >
                포스팅
              </button>

              <button
                onClick={() => {
                  setCurrentTab("Contact")
                  router.push("/")
                }}
                className={`text-[12px] md:text-[17px] whitespace-nowrap transition-all cursor-pointer relative py-2
                  ${currentTab === "Contact" ? "font-black text-stone-800" : "font-normal text-stone-500 hover:text-stone-900"}
                `}
              >
                소개·연락처
              </button>
            </nav>
          </div>
        </header>
      </div>

      <div className="w-full h-0 md:h-2" />

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

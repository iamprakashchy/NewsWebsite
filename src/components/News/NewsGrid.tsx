"use client";

import Image from "next/image";
import ViewAllButton from "../ui/ViewAllButton";

export default function MustReadSection() {
    return (
        <section className="py-8">
            <div className="container mx-auto px-4">
                {/* Title with See all link */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Must Read</h2>
                    <ViewAllButton
                        href="/stories"
                        text="View All"
                        variant="default"
                        size="md"
                    />
                </div>

                {/* 3-column layout (mobile-first, then 4 cols at md, 
            using col spans to shape columns) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Left Column (narrow) */}
                    <div className="md:col-span-1">
                        <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-[1.02]">
                            <div className="relative h-48 w-full">
                                <Image
                                    src="https://cdnuploads.aa.com.tr/uploads/Contents/2023/02/24/thumbs_b_c_0c458a3a02a1d33b7aed1ba200b95971.jpg?v=150849"
                                    alt="Ukraine's silence"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                    <span className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <span className="text-white text-xs">CNN</span>
                                    </span>
                                    <span className="text-white text-xs">• 10 hours ago</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                                    Ukraine&apos;s silence along southern front fuels counteroffensive
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                Miles of empty fields where you might expect a build-up of
                                    armor. Tanks remain out of sight. But is Ukraine&apos;s new
                                    strategy paying off?...
                                </p>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <span className="text-red-500">War</span>
                                    <span className="mx-2">•</span>
                                    <span>8 min read</span>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Center Column (wider) */}
                    <div className="md:col-span-2">
                        <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full transition-transform duration-300 hover:transform hover:scale-[1.02]">
                            <div className="relative h-64 w-full">
                                <Image
                                    src="https://cdnuploads.aa.com.tr/uploads/Contents/2023/02/24/thumbs_b_c_0c458a3a02a1d33b7aed1ba200b95971.jpg?v=150849"
                                    alt="Taylor Swift"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4 flex items-center gap-2">
                                    <span className="flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <span className="text-white text-xs">CNN</span>
                                    </span>
                                    <span className="text-white text-xs">• 5 hours ago</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold mb-2 line-clamp-2">
                                    Taylor Swift is sending a powerful message to women on the Eras Tour
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                My first stirrings of discontent for Taylor Swift&apos;s show in Las
                                    Vegas hit after the infectious bass refuel from fan-favorite
                                    &ldquo;Cruel Summer&rdquo;; the setlist roars...
                                </p>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <span className="text-red-500">Entertainment</span>
                                    <span className="mx-2">•</span>
                                    <span>10 min read</span>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* Right Column (narrow, stacked items) */}
                    <div className="md:col-span-1 flex flex-col gap-6">
                        {/* Top Right Item */}
                        <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-[1.02]">
                            <div className="relative h-48 w-full">
                                <Image
                                    src="https://cdnuploads.aa.com.tr/uploads/Contents/2023/02/24/thumbs_b_c_0c458a3a02a1d33b7aed1ba200b95971.jpg?v=150849"
                                    alt="Qatar city of the future"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                                        BBC News
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                                    Inside Qatar&apos;s city of the future
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                An in-depth look at the architectural marvel rising from the
                                desert, set to redefine urban living...
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span>BBC News</span>
                                    <span>20 hours ago</span>
                                </div>
                            </div>
                        </article>

                        {/* Bottom Right Item */}
                        <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-[1.02]">
                            <div className="relative h-48 w-full">
                                <Image
                                    src="https://cdnuploads.aa.com.tr/uploads/Contents/2023/02/24/thumbs_b_c_0c458a3a02a1d33b7aed1ba200b95971.jpg?v=150849"
                                    alt="Wrexham promotion"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                                        Goal
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                                    Wrexham secures promotion from the National League
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                    Ryan Reynolds and Rob McElhenney celebrate a fairytale season
                                    as Wrexham returns to the Football League...
                                </p>
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                    <span>Goal</span>
                                    <span>2 hours ago</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}

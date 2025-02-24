'use client'
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowDroprightCircle, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useRef, useState, useEffect } from 'react';
import ViewAllButton from '../ui/ViewAllButton';

interface StoryItem {
    id: string;
    name: string;
    image: string;
    link: string;
}

const storyData: StoryItem[] = [
    {
        id: '1',
        name: 'BBC News',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png',
        link: '/news/bbc'
    },
    {
        id: '2',
        name: 'Formula 1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/2560px-F1.svg.png',
        link: '/sports/formula1'
    },
    {
        id: '3',
        name: 'Apple',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png',
        link: '/tech/apple'
    },
    {
        id: '4',
        name: 'Samsung',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png',
        link: '/tech/samsung'
    },
    {
        id: '5',
        name: 'IDN Times',
        image: 'https://upload.wikimedia.org/wikipedia/commons/8/85/IDN_Times_logo.png',
        link: '/news/idn'
    },
    {
        id: '6',
        name: 'TikTok Studio',
        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/800px-TikTok_logo.svg.png',
        link: '/social/tiktok'
    },
    {
        id: '7',
        name: 'Goal',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Football_goal_2012.jpg/1200px-Football_goal_2012.jpg',
        link: '/sports/football'
    },
    {
        id: '8',
        name: 'Economics',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop',
        link: '/business/economics'
    },
    {
        id: '9',
        name: 'FIFA',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/FIFA_logo_without_slogan.svg/800px-FIFA_logo_without_slogan.svg.png',
        link: '/sports/fifa'
    },
    {
        id: '10',
        name: 'CNN',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png',
        link: '/news/cnn'
    },
    {
        id: '11',
        name: 'BBC',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png',
        link: '/news/bbc'
    },
    {
        id: '12',
        name: 'CNN',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png',
        link: '/news/cnn'
    },
    {
        id: '13',
        name: 'BBC',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png',
        link: '/news/bbc'
    },
    {
        id: '14',
        name: 'CNN',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png',
        link: '/news/cnn'
    },
    {
        id: '15',
        name: 'BBC',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png',
        link: '/news/bbc'
    },
    {
        id: '16',
        name: 'CNN',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png',
        link: '/news/cnn'
    },
    {
        id: '17',
        name: 'BBC',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png',
        link: '/news/bbc'
    },


];

const StorySection = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(true);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftScroll(scrollLeft > 0);
            setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = scrollContainerRef.current.scrollLeft +
                (direction === 'left' ? -scrollAmount : scrollAmount);

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
            // Check initial scroll buttons visibility
            handleScroll();
            return () => scrollContainer.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <section className="py-8 bg-gradient-to-r from-gray-50 to-white">
            <div className="container relative">
                <div className="flex items-center justify-between mb-6">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                            Featured Stories
                        </h2>
                        <p className="text-gray-500 text-sm">Discover trending topics and latest updates</p>
                    </div>
                    <ViewAllButton
                        href="/stories"
                        text="View All"
                        variant="default"
                        size="md"
                    />
                </div>

                {/* Scroll Buttons */}
                {showLeftScroll && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute -left-5 top-[58%] transform -translate-y-1/2 z-10 hover:bg-white transition-all"
                        aria-label="Scroll left"
                    >
                        <IoIosArrowBack className="size-12 text-gray-700" />
                    </button>
                )}
                {showRightScroll && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute -right-5 top-[58%] transform -translate-y-1/2 z-10 hover:bg-white transition-all"
                        aria-label="Scroll right"
                    >
                        <IoIosArrowForward className="size-12 text-gray-700" />
                    </button>
                )}

                {/* Stories Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide scroll-smooth px-2"
                    style={{
                        msOverflowStyle: 'none',  /* IE and Edge */
                        scrollbarWidth: 'none',   /* Firefox */
                    }}
                >
                    {storyData.map((story) => (
                        <Link
                            key={story.id}
                            href={story.link}
                            className="group flex flex-col items-center min-w-[100px] first:ml-2 last:mr-2"
                        >
                            <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden">
                                <div className="absolute inset-0 border-2 border-gray-100 rounded-full group-hover:border-red-500 group-hover:scale-110 transition-all duration-300" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Image
                                    src={story.image}
                                    alt={story.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="100px"
                                    priority={parseInt(story.id) <= 4}
                                />
                            </div>
                            <div className="mt-3 space-y-1 text-center">
                                <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-500 transition-colors">
                                    {story.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StorySection; 
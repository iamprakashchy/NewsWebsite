"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image'
import Link from 'next/link'
import ViewAllButton from '../ui/ViewAllButton';
interface TrendingItem {
    id: number;
    category: string;
    title: string;
    image: string;
    link: string;
    date: string;
    excerpt: string;
}

const trendingData: TrendingItem[] = [
    {
        id: 1,
        category: 'TECHNOLOGY',
        title: "Japan's Virus Success Has Puzzled The World. Is Its Luck Running Out?",
        image: 'https://img.freepik.com/premium-psd/multipurpose-online-business-web-template-landing-page-concept-psd_560113-380.jpg',
        link: '/single-post-1',
        date: 'March 26, 2020',
        excerpt: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower...'
    },
    {
        id: 2,
        category: 'BUSINESS',
        title: 'What Happens When Fed Raises any Rates?',
        image: 'https://img.freepik.com/premium-psd/multipurpose-online-business-web-template-landing-page-concept-psd_560113-380.jpg',
        link: '/single-post-1',
        date: 'March 26, 2020',
        excerpt: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower...'
    },
    {
        id: 3,
        category: 'SPORTS',
        title: 'The Big Project to Link UK to Huge a Solar Farm.',
        image: 'https://live-production.wcms.abc-cdn.net.au/7ef697e6c5d620d9ac6fa741874a7de1?impolicy=wcms_crop_resize&cropH=1997&cropW=3000&xPos=0&yPos=0&width=862&height=575',
        link: '/single-post-1',
        date: 'March 26, 2020',
        excerpt: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower...'
    },
    {
        id: 4,
        category: 'BUSINESS',
        title: 'What Happens When Fed Raises any Rates?',
        image: 'https://images.pexels.com/photos/610293/pexels-photo-610293.jpeg?cs=srgb&dl=pexels-david-bartus-43782-610293.jpg&fm=jpgg',
        link: '/single-post-1',
        date: 'March 26, 2020',
        excerpt: 'The property, complete with 30-seat screening from room, a 100-seat amphitheater and a swimming pond with sandy shower...'
    },
];

const TrendingArea = () => {
    return (
        <section className="py-8">
            <div className="container">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Trending News</h2>
                    <div className="flex items-center gap-4">
                        <ViewAllButton
                            href="/stories"
                            text="View All"
                            variant="default"
                            size="md"
                        />
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="trending-carousel"
                >
                    {trendingData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <article className="group border border-gray-200 p-4 rounded-lg overflow-hidden">
                                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-4">
                                    <Link href={item.link}>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </Link>
                                    <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded-sm">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span>{item.category}</span>
                                        <span>•</span>
                                        <time>{item.date}</time>
                                    </div>
                                    <h3 className="text-xl font-bold hover:text-primary transition-colors line-clamp-2">
                                        <Link href={item.link}>{item.title}</Link>
                                    </h3>
                                    <p className="text-gray-600 line-clamp-2 text-sm">
                                        {item.excerpt}
                                    </p>
                                </div>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TrendingArea;

"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface TrendingItem {
    id: number;
    category: string;
    title: string;
    image: string;
    link: string;
}

const trendingData: TrendingItem[] = [
    {
        id: 1,
        category: 'HEALTH',
        title: 'EV Makers to Sparking Mobility Revolution',
        image: 'https://media.istockphoto.com/id/1016651270/photo/mid-adult-woman-watches-as-nurse-takes-blood-pressure.jpg?s=612x612&w=0&k=20&c=UyPy1UZpPfUamR6samJMX0mgs6DO5yfPF4AawandAS8=',
        link: '/single-post-1'
    },
    {
        id: 2,
        category: 'BUSINESS',
        title: 'What Happens When Fed Raises any Rates?',
        image: 'https://img.freepik.com/premium-psd/multipurpose-online-business-web-template-landing-page-concept-psd_560113-380.jpg',
        link: '/single-post-1'
    },
    {
        id: 3,
        category: 'SPORTS',
        title: 'The Big Project to Link UK to Huge a Solar Farm.',
        image: 'https://live-production.wcms.abc-cdn.net.au/7ef697e6c5d620d9ac6fa741874a7de1?impolicy=wcms_crop_resize&cropH=1997&cropW=3000&xPos=0&yPos=0&width=862&height=575',
        link: '/single-post-1'
    },
    {
        id: 4,
        category: 'BUSINESS',
        title: 'What Happens When Fed Raises any Rates?',
        image: 'https://images.pexels.com/photos/610293/pexels-photo-610293.jpeg?cs=srgb&dl=pexels-david-bartus-43782-610293.jpg&fm=jpgg',
        link: '/single-post-1'
    },
];

const TrendingArea = () => {
    return (
        <section className="">
            <div className="container">
                <div className="flex items-center justify-end gap-2 mb-3">
                    <button className="swiper-button-prev !static !w-8 !h-8 !mt-0 flex items-center justify-center rounded-md border border-border bg-background shadow-sm hover:bg-accent/10 transition-colors">
                        <IoIosArrowBack className="text-xl" />
                    </button>
                    <button className="swiper-button-next !static !w-8 !h-8 !mt-0 flex items-center justify-center rounded-md border border-border bg-background shadow-sm hover:bg-accent/10 transition-colors">
                        <IoIosArrowForward className="text-xl" />
                    </button>
                </div>


                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
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
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    className="trending-carousel"
                >
                    {trendingData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <article className="group bg-card rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md flex p-2">
                                <div className="relative max-w-52 h-32 w-full overflow-hidden rounded-sm">
                                    <Link href={item.link} className="block">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </Link>
                                    <span className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-lg bg-primary text-primary-foreground">
                                        {item.category}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
                                        <Link href={item.link}>{item.title}</Link>
                                    </h3>
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

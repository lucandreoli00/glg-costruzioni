'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type ProjectImage = {
  src: string | any;
  alt: string;
};

type SingleProjectSliderProps = {
  images: ProjectImage[];
  projectTitle: string;
  autoplayDelay?: number;
};

export function ProjectSwiper({ 
  images, 
  projectTitle,
  autoplayDelay = 3000 
}: SingleProjectSliderProps) {

  const id = `project-${Math.random().toString(36).substr(2, 9)}`;

  return (

    <div className="flex flex-col gap-4">


      {/* Overlay titolo 
        <div className=" text-black">
          <h3 className=" text-black font-semibold  drop-shadow-md">{projectTitle}</h3>
        </div>
        */}



    
      <div className="relative h-[100px] md:h-[100px] lg:h-[100px] rounded-2xl overflow-hidden shadow-lg shadow-boero/75 hover:shadow-accent-red">   {/* ← Altezza fissa controllata */}

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: `.${id}-prev`,
            nextEl: `.${id}-next`,
          }}
          pagination={{ 
            clickable: true, 
            el: `.${id}-pagination` 
          }}
          className="h-full w-full"   // ← importante: h-full
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="h-full">
              <ImageWithFallback
                src={img.src}
                alt={img.alt}
                loading = 'lazy'
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        

        {/* Frecce */}
        <button 
          className={`${id}-prev absolute left-4 top-1/2 -translate-y-1/2 
                    bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl transition-all hover:scale-110`}
        >
          <ChevronLeft className="size-7" />
        </button>

        <button 
          className={`${id}-next absolute right-4 top-1/2 -translate-y-1/2 
                    bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl transition-all hover:scale-110`}
        >
          <ChevronRight className="size-7" />
        </button>

        {/* Pallini */}
        <div className={`${id}-pagination absolute bottom-4 left-0 right-0 flex justify-center gap-2`} />
      </div>
    </div>
  );
}

export function ProjectSwiper1({ 
  images, 
  projectTitle,
  autoplayDelay = 5000 
}: SingleProjectSliderProps) {

  const id = `project-${Math.random().toString(36).substr(2, 9)}`;

  return (

    
    <div className="relative h-[320px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg">   {/* ← Altezza fissa controllata */}

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: `.${id}-prev`,
          nextEl: `.${id}-next`,
        }}
        pagination={{ 
          clickable: true, 
          el: `.${id}-pagination` 
        }}
        className="h-full w-full"   // ← importante: h-full
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="h-full">
            <ImageWithFallback
              src={img.src}
              alt={img.alt}
              loading = 'lazy'
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay titolo */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
        <h3 className="text-xl font-semibold drop-shadow-md">{projectTitle}</h3>
      </div>

      {/* Frecce */}
      <button 
        className={`${id}-prev absolute left-4 top-1/2 -translate-y-1/2 lg:z-50 
                   bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl transition-all hover:scale-110`}
      >
        <ChevronLeft className="size-7" />
      </button>

      <button 
        className={`${id}-next absolute right-4 top-1/2 -translate-y-1/2 lg:z-50 
                   bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl transition-all hover:scale-110`}
      >
        <ChevronRight className="size-7" />
      </button>

      {/* Pallini */}
      <div className={`${id}-pagination absolute bottom-4 left-0 right-0 z-40 flex justify-center gap-2`} />
    </div>
  );
}
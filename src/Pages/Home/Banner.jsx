import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAuth from "../../Hooks/useAuth";

const Banner = () => {
    const { user } = useAuth();  // user টা এখানে চেক করা হচ্ছে
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const slides = [
        {
            id: 1,
            image: "https://i.ibb.co/CPDj8tQ/group-businesspeople-working-together-workplace.jpg",
            title: "𝑺𝒕𝒓𝒆𝒂𝒎𝒍𝒊𝒏𝒆 𝒀𝒐𝒖𝒓 𝑾𝒐𝒓𝒌𝒇𝒐𝒓𝒄𝒆 𝑴𝒂𝒏𝒂𝒈𝒆𝒎𝒆𝒏𝒕",
            description: "𝑬𝒏𝒉𝒂𝒏𝒄𝒆 𝒚𝒐𝒖𝒓 𝒕𝒆𝒂𝒎'𝒔 𝒄𝒐𝒍𝒍𝒂𝒃𝒐𝒓𝒂𝒕𝒊𝒐𝒏 𝒂𝒏𝒅 𝒆𝒇𝒇𝒊𝒄𝒊𝒆𝒏𝒄𝒚 𝒊𝒏 𝒂 𝒔𝒆𝒂𝒎𝒍𝒆𝒔𝒔 𝒘𝒐𝒓𝒌 𝒆𝒏𝒗𝒊𝒓𝒐𝒎𝒆𝒏𝒕.",
            buttons: [{ text: "𝑱𝒐𝒊𝒏 𝒂𝒔 𝑬𝒎𝒑𝒍𝒐𝒚𝒆𝒆", link: "/join-employee" }],
        },
        {
            id: 2,
            image: "https://i.ibb.co/QjCdnB6/group-young-people-working-together.jpg",
            title: "𝑱𝒐𝒊𝒏 𝑻𝒐𝒅𝒂𝒚 𝒂𝒔 𝑬𝒎𝒑𝒍𝒐𝒚𝒆𝒆 𝒐𝒓 𝑯𝑹 𝑴𝒂𝒏𝒂𝒈𝒆𝒎𝒆𝒏𝒕!",
            description: "𝑩𝒆𝒄𝒐𝒎𝒆 𝒂 𝒑𝒂𝒓𝒕 𝒐𝒇 𝒕𝒉𝒆 𝒑𝒍𝒂𝒕𝒇𝒐𝒓𝒎—𝒆𝒊𝒕𝒉𝒆𝒓 𝒂𝒔 𝒂𝒏 𝒆𝒎𝒑𝒍𝒐𝒚𝒆𝒆 𝒐𝒓 𝑯𝑹 𝒎𝒂𝒏𝒂𝒈𝒆𝒎𝒆𝒏𝒕.",
            buttons: [{ text: "𝑱𝒐𝒊𝒏 𝒂𝒔 𝑯𝑹 𝑴𝒂𝒏𝒂𝒈𝒆𝒓", link: "/join-hr" }],
        },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto ">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="relative">
                        {/* Image */}
                        <img
                            src={slide.image}
                            alt={`Slide ${slide.id}`}
                            className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                        />
                        {/* Title and Description */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-center px-4 space-y-4">
                            <h2 className="text-lg sm:text-xl md:text-2xl">{slide.title}</h2>
                            <p className="text-sm sm:text-base md:text-lg">{slide.description}</p>
                            {/* Buttons */}
                            {!user && (
                                <div className="flex flex-wrap justify-center space-x-4 mt-4">
                                    {slide.buttons.map((button, index) => (
                                        <a
                                            key={index}
                                            href={button.link}
                                            className="bg-[#2596be] hover:bg-[#1d7e8d] text-black font-bold py-2 px-4 rounded-full mt-2"
                                        >
                                            {button.text}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;

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
            title: "Streamline Your Workforce Management",
            buttons: [{ text: "Join as Employee", link: "/join-employee" }],
        },
        {
            id: 2,
            image: "https://i.ibb.co/QjCdnB6/group-young-people-working-together.jpg",
            title: "Join Today as Employee or HR Manager!",
            buttons: [{ text: "Join as HR Manager", link: "/join-hr" }],
        },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto mt-6">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id} className="relative">
                        {/* ইমেজ */}
                        <img
                            src={slide.image}
                            alt={`Slide ${slide.id}`}
                            className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover"
                        />
                        {/* টাইটেল */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-lg sm:text-2xl md:text-3xl font-bold text-center px-4 space-y-4">
                            <h2>{slide.title}</h2>
                            {/* বাটন - user থাকলে বাটন গুলো গোপন হবে */}
                            {!user && (
                                <div className="flex space-x-4">
                                    {slide.buttons.map((button, index) => (
                                        <a
                                            key={index}
                                            href={button.link}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
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

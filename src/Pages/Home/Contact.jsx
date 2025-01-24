import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="bg-gray-100 py-10 px-5 lg:px-20">
            <h2 className="text-3xl font-bold text-center text-black mb-8">𝑪𝒐𝒏𝒕𝒂𝒄𝒕 𝑼𝒔</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Contact Information */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-[#2596be]">Get in Touch</h3>
                    <p className="text-gray-600">
                        We'd love to hear from you! Fill out the form or reach out using the details below.
                    </p>
                    <div className="flex items-center space-x-4 text-gray-700">
                        <FaMapMarkerAlt className="text-[#2596be] text-xl" />
                        <span>123 Main Street, Dhaka, Bangladesh</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-700">
                        <FaPhoneAlt className="text-green-500 text-xl" />
                        <span>+880 123 456 789</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-700">
                        <FaEnvelope className="text-red-500 text-xl" />
                        <span>info@example.com</span>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-blue-600 hover:text-blue-800 text-xl">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="text-blue-400 hover:text-blue-600 text-xl">
                            <FaTwitter />
                        </a>
                        <a href="#" className="text-pink-500 hover:text-pink-700 text-xl">
                            <FaInstagram />
                        </a>
                    </div>
                </div>

                {/* Contact Form */}
                <form className="bg-white shadow-md rounded-lg p-8 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-[#2596be] font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full mt-2 p-3 border rounded-lg focus:ring focus:ring-blue-300"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-[#2596be] font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full mt-2 p-3 border rounded-lg focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-[#2596be] font-medium">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="w-full mt-2 p-3 border rounded-lg focus:ring focus:ring-blue-300"
                            placeholder="Write your message"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#2596be] text-white py-3 rounded-lg hover:bg-[#1d7892] transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;

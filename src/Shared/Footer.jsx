import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#2596be] text-white py-6">
            <div className="container mx-auto px-5">
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 lg:space-x-8">
                    {/* Contact Information */}
                    <div className="text-center lg:text-left">
                        <h4 className="text-lg font-semibold mb-2">𝑪𝒐𝒏𝒕𝒂𝒄𝒕 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏</h4>
                        <p>Email: contact@chillgaming.com</p>
                        <p>Phone: +123 456 789</p>
                        <p>Address: 123 Gaming Street, Game City, GC 45678</p>
                    </div>

                    {/* Social Media Links */}
                    <div className="text-center lg:text-left">
                        <h4 className="text-lg font-semibold mb-2">𝑺𝒐𝒄𝒊𝒂𝒍 𝑴𝒆𝒅𝒊𝒂 𝑳𝒊𝒏𝒌𝒔</h4>
                        <div className="flex justify-center lg:justify-start space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-500 transition"
                            >
                                <FaFacebookF className="text-white text-xl" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-500 transition"
                            >
                                <FaLinkedinIn className="text-white text-xl" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-500 transition"
                            >
                                <FaTwitter className="text-white text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Important Links */}
                    <div className="text-center lg:text-left">
                        <h4 className="text-lg font-semibold mb-2">𝑰𝒎𝒑𝒐𝒓𝒕𝒂𝒏𝒕 𝑳𝒊𝒏𝒌𝒔</h4>
                        <div className="flex justify-center lg:justify-start space-x-4">
                            <a
                                href="/privacy-policy"
                                className="hover:text-blue-500 transition"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="/terms-and-conditions"
                                className="hover:text-blue-500 transition"
                            >
                                Terms & Conditions
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Copy */}
                <p className="text-sm text-center mt-6">
                    &copy; {new Date().getFullYear()} Chill Gaming. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

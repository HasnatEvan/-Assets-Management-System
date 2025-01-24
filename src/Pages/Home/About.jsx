const About = () => {
    return (
        <div className="bg-white py-10 px-5 md:px-12 lg:px-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2596be] mb-6">
                𝑨𝒃𝒐𝒖𝒕 𝑼𝒔
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
                Welcome to Manage Mate's Asset Management System! Our goal is to help businesses efficiently manage their assets
                and empower HR managers to track employee usage with ease. From returnable items like laptops to
                non-returnable items like stationery, our system ensures everything is in perfect order.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#2596be] mb-4">𝑬𝒇𝒇𝒊𝒄𝒊𝒆𝒏𝒕 𝑻𝒓𝒂𝒄𝒌𝒊𝒏𝒈</h3>
                    <p className="text-gray-600">
                        Keep track of all assets, whether they're returnable or non-returnable,
                        with detailed reports and statuses.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#2596be] mb-4">𝑼𝒔𝒆𝒓 𝑹𝒐𝒍𝒆𝒔</h3>
                    <p className="text-gray-600">
                        Designed for both employees and HR managers, offering tailored
                        dashboards and functionalities for each role.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-xl sm:text-2xl font-semibold text-[#2596be] mb-4">𝑺𝒆𝒂𝒎𝒍𝒆𝒔𝒔 𝑰𝒏𝒕𝒆𝒈𝒓𝒂𝒕𝒊𝒐𝒏</h3>
                    <p className="text-gray-600">
                        Enjoy a user-friendly experience with responsive design and intuitive navigation
                        on all devices.
                    </p>
                </div>
            </div>
            <div className="mt-10 text-center">
                <h3 className="text-2xl md:text-3xl font-semibold text-[#2596be] mb-4">Why Choose Us?</h3>
                <ul className="list-disc list-inside text-gray-600">
                    <li>Real-time asset tracking</li>
                    <li>Secure and reliable system</li>
                    <li>Customizable features for every company</li>
                    <li>Responsive design for mobile, tablet, and desktop</li>
                    <li>Integrated payment and package management</li>
                </ul>
            </div>
        </div>
    );
};

export default About;

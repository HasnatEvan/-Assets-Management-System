
const About = () => {
    return (
        <div className="bg-gray-100 py-10 px-5 md:px-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">About Us</h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
                Welcome to Manage Mate's Asset Management System! Our goal is to help businesses efficiently manage their assets 
                and empower HR managers to track employee usage with ease. From returnable items like laptops to 
                non-returnable items like stationery, our system ensures everything is in perfect order.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Efficient Tracking</h3>
                    <p className="text-gray-600">
                        Keep track of all assets, whether they're returnable or non-returnable, 
                        with detailed reports and statuses.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">User Roles</h3>
                    <p className="text-gray-600">
                        Designed for both employees and HR managers, offering tailored 
                        dashboards and functionalities for each role.
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Seamless Integration</h3>
                    <p className="text-gray-600">
                        Enjoy a user-friendly experience with responsive design and intuitive navigation 
                        on all devices.
                    </p>
                </div>
            </div>
            <div className="mt-10 text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
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

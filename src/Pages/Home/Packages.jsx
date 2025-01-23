import React from "react";

const Packages = () => {
  // Static package information
  const packages = [
    {
      title: "Starter Plan",
      description: "For small teams managing up to 5 employees.",
      price: "$5/month",
      features: ["Up to 5 employees", "Basic analytics", "Email support"],
    },
    {
      title: "Growth Plan",
      description: "For growing teams managing up to 10 employees.",
      price: "$8/month",
      features: ["Up to 10 employees", "Advanced analytics", "Priority support"],
    },
    {
      title: "Enterprise Plan",
      description: "For larger teams managing up to 20 employees.",
      price: "$15/month",
      features: [
        "Up to 20 employees",
        "Comprehensive analytics",
        "Dedicated support",
      ],
    },
  ];

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-16">
        <h2 className="text-3xl lg:text-5xl font-bold text-center text-gray-800 mb-12">
          Our Packages
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-800">
                {pkg.title}
              </h3>
              <p className="mt-2 text-gray-600">{pkg.description}</p>
              <p className="mt-4 text-2xl lg:text-3xl font-bold text-green-500">
                {pkg.price}
              </p>
              <ul className="mt-4 space-y-2">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-700">
                    ✔ {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;

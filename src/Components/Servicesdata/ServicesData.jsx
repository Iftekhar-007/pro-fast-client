import {
  BsTruck,
  BsGlobe,
  BsBoxSeam,
  BsCashCoin,
  BsBuilding,
  BsArrowReturnLeft,
} from "react-icons/bs";

const servicesData = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: <BsTruck size={30} />,
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: <BsGlobe size={30} />,
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <BsBoxSeam size={30} />,
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <BsCashCoin size={30} />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: <BsBuilding size={30} />,
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <BsArrowReturnLeft size={30} />,
  },
];

const Services = () => {
  return (
    <section className="lg:w-11/12 mx-auto rounded-3xl my-10 py-12 px-4 md:px-16 bg-green-900 text-gray-800">
      <div className="text-center mb-10">
        <h2 className="text-3xl text-white md:text-4xl font-bold mb-2">
          Our Services
        </h2>
        <p className="text-white">We deliver more than just parcels.</p>
      </div>
      <div className="lg:w-10/12 mb-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="border bg-white text-center items-center flex flex-col border-gray-200 rounded-2xl shadow-sm p-6 hover:bg-green-100 transition-colors duration-300 cursor-pointer"
          >
            <div className="text-green-600 mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-700 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

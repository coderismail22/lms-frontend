const WebsitesWeBuild = () => {
  const facilities = [
    {
      title: "LMS",
      description: "We develop learning management system.",
      image:
        "https://bdu.ac.bd/bdu-admin/uploads/content/2024/10/415/feature_image.jpg",
    },
    {
      title: "School Management System",
      description: "We develop school management system.",
      image:
        "https://i.ytimg.com/vi/Xiu8PA_eeVQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBEvI8uHNhYKAcLtqSurW8RObN1fA",
    },
    {
      title: "Online Travel Agency",
      description: "We develop online travel websites.",
      image:
        "https://cdn.dribbble.com/users/1644806/screenshots/14097173/frame_14_4x.png",
    },
    {
      title: "Portfolio Website",
      description: "We develop portfolio website.",
      image:
        "https://media.licdn.com/dms/image/v2/D5612AQEqrH2rMY7GRw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1679600688291?e=2147483647&v=beta&t=Oeys9AGTVXEQ8pAFIUCFGF-m1zkH5P3PsKftwfj8ZIA",
    },
    {
      title: "Visa Processing",
      description: "We develop Visa Processing web applications.",
      image: "https://pbs.twimg.com/media/GUx8H6aaMAALOf9.jpg",
    },
    {
      title: "News Portal Website",
      description: "We develop news portal website.",
      image: "https://cdn.bdstall.com/product-image/giant_91759.png",
    },
  ];

  return (
    <section className="w-[80%] mx-auto py-8  ">
      {/* Header */}
      <div className="text-black relative  p-10 rounded-lg shadow-lg text-center mb-12 bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l ">
        <h1
          className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 
                         text-transparent bg-clip-text "
        >
          Websites We Develop
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto font-semibold text-gray-600">
          We Specialize in Industry-Grade MERN Stack Services. But, We Also
          Offer Other Kinds of Web Services too.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={facility.image}
              alt={facility.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-600">
                {facility.title}
              </h3>
              <p className="text-gray-600 mt-2">{facility.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="text-black relative  p-10 rounded-lg shadow-lg text-center my-12 bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-l ">
        <h1
          className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 
                         text-transparent bg-clip-text "
        >
          Need Custom Tailored Solution?
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto font-semibold text-gray-600">
          We always offer you 100% custom solutions that meet your demands.
        </p>
      </div>
    </section>
  );
};

export default WebsitesWeBuild;

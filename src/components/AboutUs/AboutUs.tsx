const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-siliguri">
      {/* Header Section */}
      <section className="relative overflow-hidden py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            আমাদের সম্পর্কে{" "}
          </h1>
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-700 opacity-30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-600 opacity-40 rounded-full translate-x-1/2 translate-y-1/2"></div>
      </section>
    </div>
  );
};

export default AboutUs;

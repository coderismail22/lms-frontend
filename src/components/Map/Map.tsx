const Map = () => {
  return (
    <div className="flex justify-center items-center h-screen  ">
      <iframe
        className="w-full xs:w-[380px] sm:w-[600px] md:w-[800px] lg:w-[900px] h-[450px] "
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.49995993453!2d90.25453099073995!3d23.781066873023004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1724937490890!5m2!1sen!2sbd"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;

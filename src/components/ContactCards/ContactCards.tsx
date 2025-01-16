import ContactCard from "../ContactCard/ContactCard";

const ContactCards = () => {
  return (
    <div className="py-5 max-w-5xl mx-auto">
      <h1 className="font-montserrat font-bold text-3xl my-5 text-center text-[#767974]">
        Find Us Here
      </h1>
      <div className="grid md:grid-cols-2 gap-5  p-5 max-w-5xl">
        <ContactCard
          icon={"office"}
          title={"Head Office Address"}
          description={"Dhaka "}
        />
        <ContactCard icon={"tree"} title={"Work Hours"} description={"24/7"} />
        <ContactCard
          icon={"phone"}
          title={"Phone Number"}
          description={"8801730481212"}
        />
        <ContactCard
          icon={"mail"}
          title={"Email us at"}
          description={"ejobsit@gmail.com"}
        />
      </div>
    </div>
  );
};

export default ContactCards;

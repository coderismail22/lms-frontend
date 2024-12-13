import { FaBuilding } from "react-icons/fa";
import { FaTree } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";

const ContactCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full h-full mx-auto max-w-[600px] flex flex-col items-center justify-between p-5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-md">
      <div className="flex flex-col items-center gap-4">
        {icon == "office" ? (
          <FaBuilding className="size-10 text-[#4B8F0E]" />
        ) : icon == "tree" ? (
          <FaTree className="size-10 text-[#4B8F0E]" />
        ) : icon == "phone" ? (
          <FaPhoneAlt className="size-10 text-[#4B8F0E]" />
        ) : icon == "mail" ? (
          <FaMailBulk className="size-10 text-[#4B8F0E]" />
        ) : null}

        <h1 className="font-yeseva text-center">{title}</h1>
      </div>
      <p className="font-lato text-center">{description}</p>
    </div>
  );
};

export default ContactCard;

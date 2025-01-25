const SectionTitle = ({
  title,
  subtitle,
  titleStyles,
  subTitleStyles,
}: {
  title: string;
  subtitle?: string;
  titleStyles?: string;
  subTitleStyles?: string;
}) => {
  return (
    <div className="mb-4">
      <h1
        className={`text-5xl font-bold mb-4 text-center ${
          titleStyles ? titleStyles : `text-slate-400`
        }`}
      >
        {title}{" "}
      </h1>
      <p
        className={` text-center text-xl mt-2 ${
          subTitleStyles ? subTitleStyles : `text-white`
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default SectionTitle;

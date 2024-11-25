const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-5xl font-bold mb-4 text-center text-slate-400">{title} </h1>
        <p className="text-center text-xl mt-2">{subtitle}</p>
      </div>
    </div>
  );
};

export default SectionTitle;

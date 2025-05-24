const Cover = ({ img, title, subTitle }) => {
  return (
    <div
      className="hero h-[600px]"
      style={{
        backgroundImage: `url("${img}")`,
      }}
    >
      <div className="flex justify-center items-center md:w-3/4 px-24 py-12 bg-black bg-opacity-40 h-[280px]">
        <div className="text-center">
          <h1 className="mb-5 text-4xl md:text-5xl font-semibold text-white uppercase">{title}</h1>
          <p className="mb-5 text-white text-lg md:text-xl">{subTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Cover;

const SectionTitle = ({subHeading, heading}) => {
    return (
        <div className="text-center pb-12 md:w-3/12 mx-auto">
            <h3 className="text-yellow-400 font-semibold py-2">{subHeading}</h3>
            <h1 className="font-semibold md:text-4xl text-2xl border-y-4 py-2">{heading}</h1>
        </div>
    );
};

export default SectionTitle;
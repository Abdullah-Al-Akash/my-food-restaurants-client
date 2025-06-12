import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <div data-aos="flip-left">
      <div className="py-8 my-8 featured-bg bg-fixed text-white mb-16">
        <SectionTitle
          subHeading={"---Check it out---"}
          heading={"FROM OUR MENU"}
        ></SectionTitle>
        <div className="md:flex justify-center items-center py-8 md:px-20 px-12">
          <div className="">
            <img className="md:p-16 p-4" src={featuredImg} alt="" />
          </div>
          <div className="md:ml-8">
            <p className="text-xl font-semibold">March 20, 2023</p>
            <p className="text-2xl mt-2 font-semibold">WHERE CAN I GET SOME?</p>
            <p className="text-lg leading-7 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              voluptate facere, deserunt dolores maiores quod nobis quas quasi.
              Eaque repellat recusandae ad laudantium tempore consequatur
              consequuntur omnis ullam maxime tenetur.
            </p>
            <button className="btn btn-outline border-0 border-b-4 mt-4 font-semibold text-lg text-white border-white">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;

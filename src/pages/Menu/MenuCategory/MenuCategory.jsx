import { Link } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Cover from "../../Shared/Cover/Cover";
import MenuCard from "../../Shared/MenuCard/MenuCard";

const MenuCategory = ({
  items,
  sectionHeading,
  sectionSubHeading,
  coverImg,
  coverTitle,
  coverSubTitle,
}) => {
  return (
    <div>
      {/* Offered */}
      <div className="py-8">
        {coverImg && <Cover
          img={coverImg}
          title={coverTitle}
          subTitle={coverSubTitle}
        ></Cover>}
        {
            sectionHeading && <SectionTitle
          heading={sectionHeading}
          subHeading={sectionSubHeading}
        ></SectionTitle>
        }
        <div className={`grid md:grid-cols-2 gap-8 px-4 ${coverImg?"pt-16" :""}`}>
          {items.map((item) => (
            <MenuCard key={item._id} item={item}></MenuCard>
          ))}
        </div>
        <div className="text-center pt-8">
          <Link to={`/order/${coverTitle}`}>
          <button className="btn btn-outline border-b-4 border-0 text-xl">
            ORDER YOUR FAVOURITE FOOD
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuCategory;

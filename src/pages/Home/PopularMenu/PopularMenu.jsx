import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCard from "../../Shared/MenuCard/MenuCard";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popularItems = menu?.filter(item => item?.category === "popular");

  return (
    <div className="py-8">
      <div className="">
        <SectionTitle
          heading={"FROM OUR MENU"}
          subHeading={"---Check it out---"}
        ></SectionTitle>
      </div>
      <div className="grid md:grid-cols-2 gap-8 px-4">
        {
            popularItems.map(item => <MenuCard
            key={item._id}
            item={item}
            ></MenuCard>)
        }
      </div>
      <div className="text-center pt-8">
        <Link to="menu">
        <button className="btn btn-outline border-b-4 border-0 text-xl">View Full Menu</button>
        </Link>
      </div>
    </div>
  );
};

export default PopularMenu;

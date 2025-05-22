import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCard from "../../Shared/MenuCard/MenuCard";

const PopularMenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("./menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popularItem = data.filter(item => item.category === "popular");
        setMenu(popularItem);
      });
  }, []);

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
            menu.map(item => <MenuCard
            key={item._id}
            item={item}
            ></MenuCard>)
        }
      </div>
    </div>
  );
};

export default PopularMenu;

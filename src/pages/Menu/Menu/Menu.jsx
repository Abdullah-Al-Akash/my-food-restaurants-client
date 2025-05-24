import Cover from "../../Shared/Cover/Cover";
import banner from "../../../assets/menu/banner3.jpg";
import MenuCategory from "../MenuCategory/MenuCategory";
import useMenu from "../../../hooks/useMenu";
import cover1 from "../../../assets/menu/dessert-bg.jpeg";
import cover2 from "../../../assets/menu/pizza-bg.jpg";
import cover3 from "../../../assets/menu/salad-bg.jpg";
import cover4 from "../../../assets/menu/soup-bg.jpg";

const Menu = () => {
  const [menu] = useMenu();
  const offeredItems = menu?.filter((item) => item?.category === "offered");
  const dessertItems = menu?.filter((item) => item?.category === "dessert");
  const pizzatItems = menu?.filter((item) => item?.category === "pizza");
  const saladItems = menu?.filter((item) => item?.category === "salad");
  const soupItems = menu?.filter((item) => item?.category === "soup");
  return (
    <div className="">
      <Cover
        img={banner}
        title={"Our Menu"}
        subTitle={"Would You Like To Try a Dish?"}
      ></Cover>
      <MenuCategory
        items={offeredItems}
        sectionHeading="TODAY'S OFFER"
        sectionSubHeading={"---Don't miss---"}
        coverTitle={"drinks"}
      ></MenuCategory>
      <MenuCategory
        items={dessertItems}
        coverImg={cover1}
        coverSubTitle={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
        coverTitle={"desserts"}
      ></MenuCategory>
      <MenuCategory
        items={pizzatItems}
        coverImg={cover2}
        coverSubTitle={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
        coverTitle={"pizzas"}
      ></MenuCategory>
      <MenuCategory
        items={saladItems}
        coverImg={cover3}
        coverSubTitle={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
        coverTitle={"salads"}
      ></MenuCategory>
      <MenuCategory
        items={soupItems}
        coverImg={cover4}
        coverSubTitle={
          "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
        coverTitle={"soups"}
      ></MenuCategory>
    </div>
  );
};

export default Menu;

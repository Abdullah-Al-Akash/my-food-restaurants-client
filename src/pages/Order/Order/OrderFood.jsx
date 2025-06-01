import Cover from "../../Shared/Cover/Cover";
import orderBg from "../../../assets/shop/order-bg.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import FoodCard from "../../../components/FoodCard/FoodCard";
import { useParams } from "react-router-dom";

const OrderFood = () => {
  const [menu] = useMenu();
  const tabs = ["salads", "pizzas", "soups", "desserts", "drinks"];
  const{category} = useParams();
  const initialIndex = tabs.indexOf(category)
  console.log(category);
  const drinksItems = menu?.filter((item) => item?.category === "drinks");
  const dessertItems = menu?.filter(item => item?.category === "dessert");
  const pizzatItems = menu?.filter(item => item?.category === "pizza");
  const saladItems = menu?.filter(item => item?.category === "salad");
  const soupItems = menu?.filter(item => item?.category === "soup");
  const [tabIndex, setTabIndex] = useState(initialIndex);

  return (
    <div>
      <Cover
        img={orderBg}
        title="OUR FOOD"
        subTitle="Would you like to try a dish?"
      />

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="w-full flex flex-wrap justify-center gap-4 md:gap-6 my-6 px-2">
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              className={`font-semibold text-base sm:text-lg cursor-pointer px-3 py-2 outline-none border-b-2 transition-all duration-200 uppercase
                ${
                  tabIndex === index
                    ? "text-yellow-400 border-yellow-500"
                    : "text-black border-transparent"
                }`}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanel>
          <div className="grid md:grid-cols-3 gap-8 px-4 py-10">
            {
              saladItems?.map(salad => <FoodCard
              key={salad._id}
              item = {salad}
              ></FoodCard>)
            }
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-3 gap-8 px-4 py-10">
            {
              pizzatItems?.map(salad => <FoodCard
              key={salad._id}
              item = {salad}
              ></FoodCard>)
            }
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-3 gap-8 px-4 py-10">
            {
              soupItems?.map(salad => <FoodCard
              key={salad._id}
              item = {salad}
              ></FoodCard>)
            }
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-3 gap-8 px-4 py-10">
            {
              dessertItems?.map(salad => <FoodCard
              key={salad._id}
              item = {salad}
              ></FoodCard>)
            }
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-3 gap-8 px-4 py-10">
            {
              drinksItems?.map(salad => <FoodCard
              key={salad._id}
              item = {salad}
              ></FoodCard>)
            }
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default OrderFood;

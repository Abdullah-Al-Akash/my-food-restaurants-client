import Cover from "../../Shared/Cover/Cover";
import orderBg from "../../../assets/shop/order-bg.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useState } from "react";

const OrderFood = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const tabs = ["SALAD", "PIZZA", "SOUPS", "DESSERTS", "DRINKS"];

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
              className={`font-semibold text-base sm:text-lg cursor-pointer px-3 py-2 outline-none border-b-2 transition-all duration-200
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
          <p className="text-white text-center">Salad Content</p>
        </TabPanel>
        <TabPanel>
          <p className="text-white text-center">Pizza Content</p>
        </TabPanel>
        <TabPanel>
          <p className="text-white text-center">Soup Content</p>
        </TabPanel>
        <TabPanel>
          <p className="text-white text-center">Dessert Content</p>
        </TabPanel>
        <TabPanel>
          <p className="text-white text-center">Drinks Content</p>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default OrderFood;

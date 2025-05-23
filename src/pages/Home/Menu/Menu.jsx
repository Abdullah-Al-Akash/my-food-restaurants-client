import Cover from "../../Shared/Cover/Cover";
import banner from "../../../assets/menu/banner3.jpg"

const Menu = () => {
    return (
        <div className=''>
            <Cover
            img = {banner}
            title={"Our Menu"}
            subTitle={"Would You Like To Try a Dish?"}
            ></Cover>
            <h2>Men men menu</h2>
        </div>
    );
};

export default Menu;
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer p-10 opacity-80 z-10  bg-black text-neutral-content">
        <aside>
          <img className="md:w-3/12 w-1/2" src={logo} alt="" />
          <p>
            My Food Restaurant
            <br />
            Providing reliable food since 2023
          </p>
        </aside>
        <nav className="">
          <header className="footer-title">Social</header>
          <div className="grid grid-flow-col gap-4">
            <img className="w-[30px] hover:cursor-pointer" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/X_logo.jpg/1024px-X_logo.jpg" alt="" />
            <img className="w-[30px] hover:cursor-pointer" src="https://www.iconpacks.net/icons/2/free-youtube-logo-icon-2431-thumb.png" alt="" />
            <img className="w-[30px] hover:cursor-pointer" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png" alt="" />
          </div>
        </nav>
      </div>
      <div className="footer footer-center p-4 bg-orange-300 text-black ">
        <aside>
          <p>Copyright © 2025 - All right reserved by My Food Restaurent</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;

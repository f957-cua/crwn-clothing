import Directory from "../../components/directory/directory.component";
import { Outlet } from "react-router-dom";

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "Hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
      linkUrl: "shop/hats",
    },
    {
      id: 2,
      title: "Jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
      linkUrl: "shop/jackets",
    },
    {
      id: 3,
      title: "Sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
      linkUrl: "shop/sneakers",
    },
    {
      id: 4,
      title: "Womans",
      imageUrl: "https://i.ibb.co/GCCdy8t/womans.png",
      size: "large",
      linkUrl: "shop/womans",
    },
    {
      id: 5,
      title: "Mans",
      imageUrl: "https://i.ibb.co/R70vBrQ/mans.png",
      size: "large",
      linkUrl: "shop/mans",
    },
  ];
  return (
    <>
      <Directory categories={categories} />
      <Outlet />
    </>
  );
};

export default Home;

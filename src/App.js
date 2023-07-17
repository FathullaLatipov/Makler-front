import { useContext, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate, useNavigate,
} from "react-router-dom";
import {
  EditPage,
  Footer,
  LoginModal,
  Navbar,
  ScrollTop,
} from "./components";
import ContextApp from "./context/context";
import "react-toastify/dist/ReactToastify.css";
import {
  AllIndustriya,
  AllProducts,
  CreateIndustriya,
  CreateMebel,
  CreatePage,
  CreateProduct,
  EditHouse,
  EditMaster,
  EditMebel,
  EditStore,
  Home,
  Industriya,
  MasterPage,
  Mebel,
  SavedProduct,
  SingleMebel,
  SingleProduct,
  UserCabinet,
  Workers,
} from "./pages";
import { ToastContainer } from "react-toastify";
import CreatePageProtect from "./components/CreatePageProtect/CreatePageProtect";
import BottomNavbar from "./components/BottomNavbar/BottomNavbar";
import $host from "./http";
import AboutUs from "./components/AboutUs/AboutUs";
import {verifyUser} from "./http/userHttp";

const CabinetPage = () => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    return <Navigate to={`/cabinet/${userId}`} />;
  }
  return <Navigate to={`/`} />;
};


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addUserData, userData, setFavorites } = useContext(ContextApp);

  const { openLoginModal } = useContext(ContextApp);

  const getData = async (setData, url) => {
    const userToken = localStorage.getItem("access");
    const userId = window.localStorage.getItem("userId");

    try {
      const favorites = await $host.get(`/products/api/v1/houses/get-wishlist-houses?user=${userId}`)
      setFavorites(favorites.data.results);

      const { data } = await $host
          .get(`/users/api/v1/${url}/${userId}`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          });
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    let access = localStorage.getItem("access");
    try {
      if (access) {
        setIsLogin(true);
        await verifyUser();
        await getData(addUserData, "profile");
      } else {
        setIsLogin(false);
      }
      setLoading(false)
    } catch (e) {
      console.log(e);
    }

  }

  useEffect(() => {
    fetchData();
  }, []);

  if(loading) return null;

  return (
    <>
      <div className="wrapper">

        <ToastContainer />
        <ScrollTop />
        <Navbar />


        {openLoginModal && <LoginModal />}


        <Routes>
          
          <Route
            path="/create"
            element={
              <CreatePageProtect user={isLogin}>
                <CreatePage />
              </CreatePageProtect>
            }
          />

          <Route
              path="/cabinet/:id"
              element={
                <CreatePageProtect user={isLogin}>
                  <UserCabinet />
                </CreatePageProtect>
              }
          />


          <Route path="/" element={<Home />} />
          <Route path="/cabinet" element={<CabinetPage />} />

          <Route path="/edit-product/:id" element={<EditHouse />} />
          <Route path="/edit-master/:id" element={<EditMaster />} />
          <Route path="/edit-store/:id" element={<EditStore />} />
          <Route path="/edit-mebel/:id" element={<EditMebel />}/>


          <Route path="/edit-mebel" element={<CabinetPage />} />
          <Route path="/edit-product" element={<CabinetPage />} />
          <Route path="/edit-master" element={<CabinetPage />} />
          <Route path="/edit-store" element={<CabinetPage />} />

          <Route path="/create/master" element={<EditPage />} />
          <Route path="/create/product" element={<CreateProduct />} />
          <Route path="/create/mebel" element={<CreateMebel />} />
          <Route path="/save-products" element={<SavedProduct />} />


          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/product" element={<AllProducts />} />
          <Route path="/master" element={<Workers />} />
          <Route path="/mebel" element={<Mebel />} />
          <Route path="/mebel/:id" element={<SingleMebel />} />
          <Route path="/master/:id" element={<MasterPage />} />
          <Route path="/industria/:id" element={<Industriya />} />
          <Route path="/industria" element={<AllIndustriya />} />
          <Route path="/create/industria" element={<CreateIndustriya />} />
          <Route path="/aboutus" element={<AboutUs/>}/>

        </Routes>
        <BottomNavbar/>
        <Footer />
      </div>
    </>
  );
}

export default App;

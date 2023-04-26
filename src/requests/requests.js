export const baseURL = "https://api.makleruz.uz";

const requests = {
  fetchCategories: `${baseURL}/api/v1/categories/`,
  fetchAllHouses: `${baseURL}/products/web/api/v1/all-web-houses/`,
  fetchAllMasters: `${baseURL}/master/api/v1/maklers/`,
  fetchAllStores: `${baseURL}/store2/api/v1/store/`,
};

export const getRequests = async () => {
  const [categories, allHouses, masters, stores] = await Promise.all([
    fetch(requests.fetchCategories, {
      headers: {
        "Accept-Language": localStorage.getItem("i18nextLng") || "ru"
      }
    }).then((res) => res.json()),
    fetch(requests.fetchAllHouses).then((res) => res.json()),
    fetch(requests.fetchAllMasters).then((res) => res.json()),
    fetch(requests.fetchAllStores).then((res) => res.json()),
  ]);

  return {
    categories: categories.results,
    allHouses: allHouses.results,
    masters: masters.results,
    stores: stores.results
  };
};

// https://api.themoviedb.org/3/tv/popular?api_key=<<api_key>>&language=en-US&page=1
export default requests;
 
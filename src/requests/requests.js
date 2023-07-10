import $host from "../http";

export const baseURL = "https://api.makleruz.uz";

const requests = {
  fetchCategories: `${baseURL}/api/v1/categories/`,
  fetchAllHouses: `${baseURL}/products/web/api/v1/all-web-houses/`,
  fetchAllMasters: `${baseURL}/master/api/v1/maklers/`,
  fetchAllStores: `${baseURL}/store2/api/v1/store/`,
};


export const getRequests = async () => {
  const [categories, allHouses, masters, stores] = await Promise.all([
    $host.get(requests.fetchCategories).then((res) => res.data),
    $host.get(requests.fetchAllHouses).then((res) => res.data),
    $host.get(requests.fetchAllMasters).then((res) => res.data),
    $host.get(requests.fetchAllStores).then((res) => res.data),
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
 
// export const base_url ="https://api-backend-ecommerce.vercel.app/api/";
export const base_url ="https://api-ecommerce-beta.vercel.app/api/";



const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

export const api = async ({ path }) => {
    //calls a rest api which will load the data
    const URL = `https://api.freeapi.app/api/v1/public${path}`;
  
    try {
      const res = await fetch(URL); // return a response promise
      const data = await res.json(); // return JS object from response json
      return data;
    } catch (e) {
      console.log("Error", e, URL);
      throw e;
    }
  };
  
  export const showLoader = () => {
    $("#book_loader").show();
  };
  export const hideLoader = () => {
    $("#book_loader").hide();
  };
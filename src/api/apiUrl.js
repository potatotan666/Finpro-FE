// const apiBaseUrl = "http://localhost:3001";
const apiBaseUrl = "https://shrouded-fortress-82657.herokuapp.com";

export const apiUrl = {
  getAllRecipes: `${apiBaseUrl}/recipe`,
  createRecipe: `${apiBaseUrl}/recipe`,
  getCategories: `${apiBaseUrl}/categories`,
  getRecipeById: `${apiBaseUrl}/recipe/`,
  login: `${apiBaseUrl}/login`,
  register: `${apiBaseUrl}/register`,
};

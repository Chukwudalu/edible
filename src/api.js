const apiKey = 9973533
const baseUrl = `https://www.themealdb.com/api/json/v2/${apiKey}`;
const authUrl = `${process.env.REACT_APP_API_URL}/api/v1/users`
export const latestMealsUrl = `${baseUrl}/latest.php`
export const randomMealsUrl = `${baseUrl}/randomselection.php`;
export const mealCategoryUrl = `${baseUrl}/categories.php`
export const searchedMealUrl = (searchQuery) => (`${baseUrl}/search.php?s=${searchQuery}`)
export const mealDetailUrl = (mealId) => (`${baseUrl}/lookup.php?i=${mealId}`)
export const categoryMealsUrl = (category) => (`${baseUrl}/filter.php?c=${category}`)

// AUTHENTICATION

export const loginUrl = `${authUrl}/login`
export const signupUrl = `${authUrl}/signup`
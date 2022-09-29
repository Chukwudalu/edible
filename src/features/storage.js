export const saveLikedMealToLocalStorage = (likedMealsArray) => {
    localStorage.setItem('likedMeals', JSON.stringify(likedMealsArray))
}

export const getLikedMealsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('likedMeals'))
}
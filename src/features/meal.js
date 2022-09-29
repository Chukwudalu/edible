import { createSlice } from '@reduxjs/toolkit';
import { latestMealsUrl, randomMealUrl } from '../api'


const initialStateValue = {
    latestMeals: [],
    randomMeals: [],
    mealCategories: [],
    searchedMeal: [],
    likedMeals: []
}

const mealSlice = createSlice({
    name: "meal",
    initialState: {
        value: initialStateValue
    },
    reducers: {
        getLatestMeal: (state, action) => {
            state.value.latestMeals = action.payload
        },

        getRandomMeal: (state, action) => {
            state.value.randomMeals = action.payload
        },

        getMealCategories: (state, action) => {
            state.value.mealCategories = action.payload
        },

        getSearchedMeal: (state, action) => {
            state.value.searchedMeal = action.payload
        }

        

        // getSearchValue: (state, action) => {
        //     state.value.searchValue = action.payload
        // }
    }
})

export const { getLatestMeal, getRandomMeal, getMealCategories } = mealSlice.actions

export default mealSlice.reducer


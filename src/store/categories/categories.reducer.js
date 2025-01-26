import { createSlice } from "@reduxjs/toolkit";

const INITIAL_CATEGORIES_STATE = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_CATEGORIES_STATE,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

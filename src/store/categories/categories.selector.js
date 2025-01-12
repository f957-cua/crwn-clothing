import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
  return state.categories;
};

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categories) => {
    return categories.categories;
  },
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (state) => {
    return state.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  },
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categories) => {
    return categories.isLoading;
  },
);

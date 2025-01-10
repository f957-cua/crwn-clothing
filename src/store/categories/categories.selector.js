import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
  console.log("selector 1 categories fired");
  return state.categories;
};

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categories) => {
    console.log("selector 2 categories fired");
    return categories.categories;
  },
);

export const getCategories = createSelector([selectCategories], (state) => {
  console.log("selector 3 categories fired");
  return state.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
});

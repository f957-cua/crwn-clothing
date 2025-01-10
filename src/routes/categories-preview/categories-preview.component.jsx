import { Fragment } from "react";
import { useSelector } from "react-redux";
import { getCategories } from "../../store/categories/categories.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(getCategories);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((categoryTitle) => {
        const products = categoriesMap[categoryTitle];
        return (
          <CategoryPreview
            key={categoryTitle}
            title={categoryTitle}
            products={products}
          />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;

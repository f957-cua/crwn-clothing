import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../context/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
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

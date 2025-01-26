import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.reducer.js";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  ProductCardContainer,
  FooterContainer,
  FooterName,
  FooterPrice,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <FooterContainer>
        <FooterName>{name}</FooterName>
        <FooterPrice>{price}</FooterPrice>
      </FooterContainer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;

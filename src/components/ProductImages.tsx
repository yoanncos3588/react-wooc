import { useEffect, useState } from "react";
import { ProductImages } from "../types/products";
import { Box, Grid } from "@mui/material";

interface Props {
  productImages: Array<ProductImages>;
  withThumbnails?: boolean;
}

const ProductImages = ({ productImages, withThumbnails = false }: Props) => {
  const [activImage, setActivImage] = useState(productImages[0]);

  function handleThumbnailHover(_e: React.MouseEvent<Element, MouseEvent>, image: ProductImages) {
    setActivImage((prev) => (prev.id !== image.id ? image : prev));
  }

  useEffect(() => {
    setActivImage(productImages[0]);
  }, [productImages]);

  return (
    <>
      <Box
        component={"img"}
        src={activImage ? activImage.src : "/placeholder.png"}
        alt={activImage ? activImage.alt : "Image d'illustration du produit"}
        sx={{ display: "block", maxWidth: "100%" }}
      />
      {productImages.length > 1 && withThumbnails && (
        <Grid container spacing={1} mt={0.25}>
          {productImages.map((i) => (
            <Grid item key={i.id} xs={2}>
              <Box
                component={"img"}
                src={i.src}
                alt={i.alt}
                sx={{ display: "block", maxWidth: "100%", cursor: "pointer", opacity: i.id === activImage.id ? 0.8 : 1 }}
                onMouseEnter={(e) => handleThumbnailHover(e, i)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default ProductImages;

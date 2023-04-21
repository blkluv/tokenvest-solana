import { TvProduct } from "@/components/TvProduct/TvProduct";
import { CMS_API, CMS_PRODUCTS, POPULATE_ALL } from "@/constants/cms";
import { NO_PRODUCTS_TEXT } from "@/constants/general";
import { PRODUCTS } from "@/constants/routes";
import { ICMSProduct, IProduct } from "@/interfaces/cmsinterace";
import { productsStyles } from "@/styles/Products.styles";
import { handleRequest, METHODS } from "@/utils/handleRequest";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export async function getStaticProps() {
  const data = await handleRequest(`${CMS_API}${CMS_PRODUCTS}${POPULATE_ALL}`, METHODS.GET);

  const products: IProduct[] = data?.data?.map((item: ICMSProduct) => {
    return {
      id: item.id,
      title: item.attributes.title,
      raiseGoal: item.attributes.raiseGoal,
      sharePercentage: item.attributes.sharePercentage,
      address: item.attributes.address,
      ownerAddress: item.attributes.ownerAddress,
      ownerName: item.attributes.ownerName,
      raisedAmount: item.attributes.raisedAmount,
      createdAt: item.attributes.createdAt,
      image: item.attributes.image?.data?.attributes?.url || null
    };
  }) || [];

  return {
    props: {
      products
    }
  };
}

const Products = ({ products }: { products: IProduct[] }) => {
  return (
    <Box sx={productsStyles.productsWrapper}>
      {products.length !== 0 ? products.map((item, index) =>
        <Link href={`${PRODUCTS}/${item.id}`} key={index + 1}>
          <TvProduct product={item} />
        </Link>
      ) :
        <Typography variant="h1">{NO_PRODUCTS_TEXT}</Typography>}
    </Box>
  );
};

export default Products;

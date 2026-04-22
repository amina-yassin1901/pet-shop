import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography,
  Box,
} from "@mui/material";
import { Link as RouterLink, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Breadcrumbs = () => {
  const location = useLocation();
  const { categoryId, id } = useParams();

  const { categories } = useSelector((state) => state.categories);
  const { currentProduct } = useSelector((state) => state.products);

  const pathnames = location.pathname.split("/").filter((x) => x);

  const itemStyles = {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    border: "1px solid #DDDDDD",
    borderRadius: "6px",
    color: "#8B8B8B",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 500,
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#F1F1F1",
    },
  };

  const lastItemStyles = {
    ...itemStyles,
    color: "#282828",
    cursor: "default",
    "&:hover": { backgroundColor: "transparent" },
  };

  const getBreadcrumbs = () => {
    const crumbs = [{ label: "Main page", path: "/" }];

    if (pathnames.includes("categories")) {
      crumbs.push({ label: "Categories", path: "/categories" });
    }

    if (categoryId) {
      const category = categories.find((cat) => cat.id === Number(categoryId));
      crumbs.push({ label: "Categories", path: "/categories" });
      crumbs.push({
        label: category?.title || "Loading...",
        path: `/products/category/${categoryId}`,
      });
    }

    if (pathnames.includes("products") && !categoryId && !id) {
      if (pathnames.includes("sale")) {
        crumbs.push({ label: "All sales", path: "/products/sale" });
      } else {
        crumbs.push({ label: "All products", path: "/products" });
      }
    }

    if (id && currentProduct) {
      crumbs.push({ label: "Categories", path: "/categories" });

      const productCategory = categories.find(
        (cat) => cat.id === Number(currentProduct.categoryId),
      );

      if (productCategory) {
        crumbs.push({
          label: productCategory.title,
          path: `/products/category/${productCategory.id}`,
        });
      }

      crumbs.push({ label: currentProduct.title, path: `/products/${id}` });
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <Box sx={{ margin: "40px 0" }}>
      <MUIBreadcrumbs
        separator={
          <Box
            component="span"
            sx={{ width: "16px", height: "1px", bgcolor: "#DDDDDD" }}
          />
        }
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return isLast ? (
            <Typography key={crumb.label} sx={lastItemStyles}>
              {crumb.label}
            </Typography>
          ) : (
            <Link
              key={crumb.label}
              component={RouterLink}
              to={crumb.path}
              sx={itemStyles}
            >
              {crumb.label}
            </Link>
          );
        })}
      </MUIBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;

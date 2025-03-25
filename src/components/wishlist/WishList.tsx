import styles from "../../styles/components/wishlist/wishList.module.scss";
import { Button, Heading, Icons, Img } from "../../utils";
import { Table } from "../common/Table.tsx";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo } from "react";
import { useWishlist } from "../../hooks/useWishlist";
type props = {
  rowProduct: {
    name: string;
    image: string;
  };
  rowPrice: string;
  rowDelete: () => void;
};

// WishlistPage component
const WishlistPage = () => {
  const columnHelper = createColumnHelper<props>();
  const { removeItemFromWishlist, wishlist } = useWishlist();

  const data: props[] =
    wishlist?.map((item) => ({
      rowProduct: {
        name: item.name,
        image: item.photoUrl,
      },
      rowPrice: item.discount.discountedPrice.toString(),
      rowDelete: () => {
        removeItemFromWishlist(item._id);
      },
    })) ?? ([] as props[]);
  // useMemo(
  //   () => {
  //   // Dummy data for te
  //   return [
  //     {
  //       rowProduct: {
  //         name: "Sample Product",
  //         image: "/path/to/image.jpg",
  //       },
  //       rowPrice: "99.99",
  //       rowDelete: () => {
  //         removeItemFromWishlist(item);
  //       },
  //     },
  //   ];
  // }, []);

  // Columns for the table
  const columns = useMemo(
    () => [
      columnHelper.accessor("rowProduct", {
        cell: (info) => (
          <div className={styles["product-cell"]}>
            <div className={styles["image-container"]}>
              <Img src={info.getValue().image} alt="Product" />
            </div>
            <Heading>{info.getValue().name}</Heading>
          </div>
        ),
        header: () => (
          <div
            className={`${styles["header-cell"]} ${styles["product-header"]}`}
          >
            <Heading>Product</Heading>
          </div>
        ),
      }),
      columnHelper.accessor("rowPrice", {
        cell: (info) => (
          <div className={styles["price-cell"]}>
            <Heading>&euro; {info.getValue()}</Heading>
          </div>
        ),
        header: () => (
          <div className={`${styles["header-cell"]} ${styles["price-header"]}`}>
            <Heading>Price</Heading>
          </div>
        ),
      }),
      columnHelper.accessor("rowDelete", {
        id: "delete",
        cell: (info) => (
          <Button className={styles["delete-cell"]} onClick={info.getValue()}>
            <Icons.Delete />
          </Button>
        ),
        header: () => null,
      }),
    ],
    [columnHelper],
  );

  return (
    <section className={styles.wishlist}>
      <div className={styles["table-container"]}>
        <Table
          columns={columns}
          data={data}
          className={styles["wishlist-table"]}
          theadProps={{ className: styles["wishlist-thead"] }}
          thProps={{ className: styles["wishlist-th"] }}
          tbodyProps={{ className: styles["wishlist-tbody"] }}
          trProps={{ className: styles["wishlist-tr"] }}
          tdProps={{ className: styles["wishlist-td"] }}
        />
      </div>
    </section>
  );
};

export default WishlistPage;

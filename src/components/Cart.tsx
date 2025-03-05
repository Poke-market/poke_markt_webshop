import { Button, Heading, Img, Input } from "../utils";
import { Table } from "./Table.tsx";
import { createColumnHelper } from "@tanstack/react-table";

type CartItem = {
  rowProduct: string;
  rowPrice: string;
  rowQuantity: string;
  rowSubtotal: string;
};

const prolongation: CartItem[] = [
  {
    rowProduct: "Product Name",
    rowPrice: "0.00",
    rowQuantity: "1",
    rowSubtotal: "0.00",
  },
];
const CartPage = () => {
  const columnHelper = createColumnHelper<CartItem>();

  const columns = [
    columnHelper.accessor("rowProduct", {
      cell: (info) => (
        <div className="product-cell">
          <div className="image-container">
            <Img src="https://via.placeholder.com/150" alt="Product" />
          </div>
          <Heading>{info.getValue()}</Heading>
        </div>
      ),
      header: "Product",
    }),
    columnHelper.accessor("rowPrice", {
      cell: (info) => <Heading>{info.getValue()}</Heading>,
      header: "Price",
    }),
    columnHelper.accessor("rowQuantity", {
      cell: (info) => <Input type="number" defaultValue={info.getValue()} />,
      header: "Quantity",
    }),
    columnHelper.accessor("rowSubtotal", {
      cell: (info) => <Heading>{info.getValue()}</Heading>,
      header: "Total",
    }),
    columnHelper.display({
      id: "delete",
      cell: () => <Button className="delete-cell">Delete</Button>,
    }),
  ];

  return (
    <section className="cart">
      <div className="table-container">
        <Table
          columns={columns}
          data={prolongation}
          className="cart-table"
          theadProps={{ className: "cart-thead" }}
          thProps={{ className: "cart-th" }}
          tbodyProps={{ className: "cart-tbody" }}
          trProps={{ className: "cart-tr" }}
          tdProps={{ className: "cart-td" }}
        />
      </div>
      <div className="totals-container">
        <div className="totals-content">
          <Heading as="h1" size="textmd">
            Cart Totals
          </Heading>
          <div className="subtotal">
            <Heading>Subtotal</Heading>
            <Heading>0.00</Heading>
          </div>
          <div className="total">
            <Heading>Total</Heading>
            <Heading className="total-amount">0.00</Heading>
          </div>
          <Button>Check Out</Button>
        </div>
      </div>
    </section>
  );
};
export default CartPage;

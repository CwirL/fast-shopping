import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import {
  ColumnHeader,
  TableContainerFixed,
  TableWraper,
} from 'styles/checkoutStyles';

const ProductsTable = ({ products }) => (
  <TableWraper>
    <TableContainerFixed>
      <Table>
        <TableHead>
          <TableRow>
            <ColumnHeader>Product</ColumnHeader>
            <ColumnHeader>Unit Price</ColumnHeader>
            <ColumnHeader>Units</ColumnHeader>
            <ColumnHeader>Total Price</ColumnHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, id) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="center">{product.price}</TableCell>
              <TableCell align="center">{product.amount}</TableCell>
              <TableCell align="center">
                {(product.amount * product.price).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainerFixed>
  </TableWraper>
);

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id_product: PropTypes.string.isRequired,
      name: PropTypes.string,
      category: PropTypes.string,
      price: PropTypes.number,
      amount: PropTypes.number,
    })
  ).isRequired,
};

export default ProductsTable;

import React from 'react';

const AddAssetsTable = ({ asset }) => {
  return (
    <div>
      <h3>{asset.productName}</h3>
      <p>Type: {asset.productType}</p>
      <p>Quantity: {asset.productQuantity}</p>
    </div>
  );
};

export default AddAssetsTable;

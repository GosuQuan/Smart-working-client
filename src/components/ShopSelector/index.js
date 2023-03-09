import React from "react";
import { Select, Space } from "antd";

function ShopSelector(props) {
  const { shop, getData } = props;

  const shopOpt = shop.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
  const handleSelect = (value) => {
    getData(value);
  };

  return (
    <div>
      <Space wrap>
        <Select
          size="large"
          defaultValue="请选择"
          style={{
            width: 120,
          }}
          onSelect={handleSelect}
          options={shopOpt}
        />
      </Space>
    </div>
  );
}

export default ShopSelector;

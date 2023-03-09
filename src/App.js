import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Button } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import ShopSelector from "./components/ShopSelector";
import MyTabs from "./components/MyTabs";
import DayTable from "./components/DayTable";
import axios from "axios";

function App() {
  const HeaderStyle = {
    backgroundColor: "white",
    textAlign: "center",
  };
  const api_getShopInfo_URL = "http://localhost:9000/store/list";
  const [toggle, setToggle] = useState(true); //按键选择
  const [shop, setShop] = useState([]); //商店列表
  const [currentShopId, setCurrentShopId] = useState(0); //目前商店ID
  const [currentShop, setCurrentShop] = useState(); //目前商店状态

  useEffect(() => {
    axios.get(api_getShopInfo_URL).then((res) => {
      console.log(res.data);
      setShop(res.data);
    });
  }, [currentShop]);

  //返回点按商店值
  const getData = (shopId) => {
    setCurrentShopId(shopId);
    const currentShop = shop.filter((item) => {
      return item.id == shopId;
    });
    setCurrentShop(currentShop);
    console.log(currentShop);
  };

  const handleOnClick = () => {
    setToggle(true);
  };
  const handleOnClick2 = () => {
    setToggle(false);
  };

  return (
    <div>
      <Layout>
        <Header style={HeaderStyle}>
          <div>
            <Row>
              <Col span={16}>
                <ShopSelector shop={shop} getData={getData}></ShopSelector>
              </Col>

              <Col span={8} style={{ backgroundColor: "white" }}>
                <span style={{ border: "1px solid", padding: "10px" }}>
                  <Button type="link" onClick={handleOnClick}>
                    按周查看
                  </Button>
                  |
                  <Button type="link" onClick={handleOnClick2}>
                    按日查看
                  </Button>
                </span>
                <Col span={16} style={{ backgroundColor: "white" }} />
              </Col>
              {toggle ? (
                <div>
                  <Col span={24}>
                    <MyTabs currentShop={currentShop}></MyTabs>
                  </Col>
                </div>
              ) : (
                <Col span={24}>
                  <DayTable currentShop={currentShop}></DayTable>
                </Col>
              )}
            </Row>
          </div>
        </Header>
        <div>
          <Content></Content>
        </div>
      </Layout>
    </div>
  );
}

export default App;

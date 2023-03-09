import React, { useState } from "react";
import { Tabs } from "antd";
import Table from "../Table";
import Table2 from "../Table2";


function MyTabs(props) {
  const { currentShop } = props;
  const [startDayAndEndDay, setStartDayAndEndDay] = useState({
    startDay: new Date(2023, 0, 27).toISOString().slice(0, 10),
    endDay: new Date(2023, 1, 5).toISOString().slice(0, 10),
  });
  const url = "http://localhost:9000/employee/lists";
  //根据地址

  const onChange = (key) => {
    console.log(`现在是商店编号:${currentShop[0].id}的第${key}周`);
    console.log(key);
    // if(key!==1)day.setDate(day.getDate()+key*7)
    // console.log(startDayAndEndDay.startDay)
    // console.log(startDayAndEndDay.endDay)
    const startDayff = new Date(2023, 0, 30);
    const endDayff = new Date(2023, 1, 5);

    startDayff.setDate(startDayff.getDate() + (key - 1) * 7);
    endDayff.setDate(endDayff.getDate() + (key - 1) * 7);

    //   console.log(startDayff.toISOString().slice(0,10))
    // console.log(endDayff.toISOString().slice(0,10))

    setStartDayAndEndDay({
      startDay: startDayff.toISOString().slice(0, 10),
      endDay: endDayff.toISOString().slice(0, 10),
    });

    // setStartDayAndEndDay({
    //   startDay:`2023-02-01`,
    //   endDay:`2023-02-29`,
    // })
  };

  const getDayItems = () => {
    var items = [];
    for (var i = 0; i < 10; i++) {
      items.push({
        key: i + 1,
        label: `第${i + 1}周`,
        children: (
          // <Table
            // 
          //   style={{ textAlign: "center" }}
          //   currentShop={currentShop}
          //   startDayAndEndDay={startDayAndEndDay}
          // ></Table>
          <Table2 currentShop={currentShop?currentShop:[123]} startDayAndEndDay={startDayAndEndDay}></Table2>
          //考虑到一开始没有参数传入会判空，上面代码如果没有参数传入默认传入一个随机的一个值防止页面无法渲染
        ),
      });
    }
    return items;
  };

  var myItems = getDayItems();

  return (
    <div>
      <h2>按周排班图</h2>
      <Tabs defaultActiveKey="1" items={myItems} onChange={onChange} />
    </div>
  );
}

export default MyTabs;

import React, {useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { Tabs } from "antd";
//拿到相应匹配的数据库参数
const api_searchList_URL = "http://localhost:9000/schedule/list";
//传参格式：?value=xxx&value2=xxx
//dataFormat

//表格式
export const data = [
  [
    { type: "string", id: "Room" },
    { type: "string", id: "Name" },
    { type: "date", id: "Start" },
    { type: "date", id: "End" },
  ],
];
//the dayTable
export default function DayTable(props) {
  var dataArr = [];
  var items = [];
  const [dayInfoArr,setDayInfoArr] = useState([]) ;
  const { currentShop } = props;
  const currentShopId = currentShop[0].id;
  const [currentDay, setCurrentDay] = useState(22);
  const onChange = (key) => {
    DayItems = getDayItems();
    setCurrentDay(key);
  };
  //params regulations
  const params =
    `/?storeId=${currentShopId}&date=2023-02-` +
    `${currentDay >= 10 ? currentDay : "0" + currentDay}`;
 
  //时间字符串和门店id
  //when currentDay change, the useEffect will reload
  useEffect(() => {
    setDayInfoArr([]);
    axios.get(api_searchList_URL+`/?storeId=${currentShopId}&startDate=2023-02-22&endDate=2023-02-24`).then(
      res=>{
        console.log(res.data);
      }
    )
    axios.get(api_searchList_URL + params).then((res) => {
      console.log(api_searchList_URL + params);
      dataArr = res.data;
      
      var tempArr = []; 
      dataArr.map((item) => {
        //  0 1 2 3 4 5  11..
        // 1 2 3 4 5         
        return item.employeeList.map((listItem, index) => {
          
          
          tempArr.push([
            item.employeeList[index].name,
            item.type,
            new Date(
              0,
              0,
              0,
              item.startTime.slice(0, 1) === "0"
                ? item.startTime.slice(1, 2)
                : item.startTime.slice(0, 2),
              item.startTime.slice(3, 5)
            ),
            new Date(
              0,
              0,
              0,
              item.endTime.slice(0, 1) === "0"
                ? item.endTime.slice(1, 2)
                : item.endTime.slice(0, 2),
              item.endTime.slice(3, 5)
            ),
          ]);
          //set the state of DayInfo
          
          
          return []
        });
      })
      tempArr.unshift([",",",",new Date(0,0,0,0),new Date(1,0,0,0)])
      //该对象无用，只是为了方便从1开始遍历数组插入数据，如果删去会少显示第一组数据。
      setDayInfoArr(tempArr);
      ;
    });
  }, [currentDay]);

  const getDayItems = () => {
    items = [];
    for (var i =1; i < 31; i++) {
      items.push({
        key: i,
        label: `第${i}天`,
        children: (
          <Chart
            chartType="Timeline"
            data={dayInfoArr}
            width="100%"
            height="400px"
            options={{
              timeline: {
                colorByRowLabel: true,
              },
            }}
          />
        ),
      });
    }
    return items;
  };
  var DayItems = getDayItems();
  return (
    <div>
      <h2>按日排班图</h2>
      <span>
        <Tabs defaultActiveKey="1" items={DayItems} onChange={onChange} />
      </span>
    </div>
  );
}

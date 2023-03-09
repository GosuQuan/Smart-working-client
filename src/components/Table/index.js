import { Button, Input, Select } from "antd";
import { useState,useEffect } from "react";
import axios from "axios";

var react_1 = require("react");
require("./index.css");

//拿到相应匹配的数据库参数
const api_searchList_URL = "http://localhost:9000/employee/list";
const api_2 = "http://localhost:9000/schedule/list";

var weekArr = [];

axios.get(api_searchList_URL).then((response) => {
  weekArr = response.data.map(item => {
    return {
      name: item.name,
      position: item.position,
      //  time: `${item.sta}`
    }
  });
  // console.log(weekArr);
})

function Table(props) {
  
  // const {currentShop,startDayAndEndDay} = props;
  // console.log(currentShop[0].id);
  // console.log(startDayAndEndDay)
  // useEffect(()=>{
  //   axios.get(api_2+`?storeId=${currentShop[0].id}&startDate=${startDayAndEndDay.startDay}&endDate=${startDayAndEndDay.endDay}`).then(res=>{
  //     console.log(res.data)
  //   })
  // },[])
  var day = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];

  var date = new Date();
  //日期
  var getDateList = function () {
    var today = date.getDay();
    return (
      <>
        {day.map(function (v, k) {
          return (
            <td className={k == today ? "dayToday" : "dayTable"}> {v} </td>
          );
        })}
      </>
    );
  };

  //随机
  const RandomArray = function getRandomArrayElements(weekArr, count) {
    var shuffled = weekArr.slice(0), i = weekArr.length, min = i - count, temp, index;

    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random()); //这里的+1 是因为上面i--的操作  所以要加回来
      temp = shuffled[index];  //即值交换
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }

  console.log(RandomArray(weekArr, 1));

  // var selectItem = (0, react_1.useState);
  // var setSelectItem = (0, react_1.useState);

  //往表格里传入数据
  var getItemValue = function (name, position) {
    return (
      <div
      // className={
      //   selectItem === name && setSelectItem === position
      //     ? "tableListSelect"
      //     : "tableList"
      // }
      //   onClick={
      //     function () {
      //       return chargeValue(name, position);
      //     }
      //   } 
      >
        <span> 内容: {RandomArray(weekArr, 1)[0].position} </span>
        <span> 用户: {RandomArray(weekArr, 1)[0].name} </span>
      </div>
    );
  };

  //删除按钮
  var delBtn = function (name, position) {
    if (name === void 0) {
      name = "none";
    }
    if (position === void 0) {
      position = "none";
    }
  }


  const [sltToggle, setSltToggle] = useState(false);

  const [btnState, setBtnState] = useState(true);

  return (
    <div className="App" class="content" id="content">
      <div className="head">
        <div className="left">
          <Select
            defaultValue={0}
            style={{
              width: 120,
            }}
            options={[
              {
                value: 0,
                label: "按岗位分组",
              },
              {
                value: 1,
                label: "按技能分组",
              },
              {
                value: 2,
                label: "按员工分组",
              },
            ]}
            onSelect={(value) => {
              if (value == 2) setSltToggle(true);
              else setSltToggle(false);
            }}
          />
          {sltToggle ? (
            <Select
              defaultValue={0}
              style={{
                width: 120,
              }}
              options={[
                {
                  value: 0,
                  label: "张三",
                },
                {
                  value: 1,
                  label: "李四",
                },
                {
                  value: 2,
                  label: "王五",
                },
              ]}
            />
          ) : (
            ""
          )}
        </div>
        <div className="right">
          <Button onClick={function () {
            return delBtn("none");
          }}>
            {" "}
            删除
          </Button>
          {btnState ? (
            <Button
              onClick={() => {
                setBtnState(!btnState);
              }}
            >
              {" "}
              编辑
            </Button>
          ) : (
            <Button
              onClick={() => {
                setBtnState(!btnState);
              }}>
              {" "}
              确定
            </Button>
          )}
        </div>
      </div>

      <table class="table" rules="all" border={1} frame={true} cellSpacing={10}
      >
        <thead>
          <tr>
            <th>时间</th>
            {getDateList()}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">8:00-10:00</td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
          </tr>

          <tr>
            {/* <td >8:00-10:00</td> */}
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
            <td className="dayTd">
              {getItemValue(RandomArray)}
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  )

}
export default Table;

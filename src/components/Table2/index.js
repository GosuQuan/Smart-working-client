import React, { useEffect, useState } from "react";
import { Card, Cascader, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import CardBox from "../CardBox";

//
function Table2(props) {
  const { startDayAndEndDay, currentShop } = props;
  const api_getList = "http://localhost:9000/schedule/list"; //api地址
  const params = `/?storeId=${currentShop[0].id}&startDate=${startDayAndEndDay.startDay}&endDate=${startDayAndEndDay.endDay}`; //参数
  const dayData = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];

  const handleChange = (e) => {};
  const [dataFormat, setDataFormat] = useState([]);
  const [btnState, setBtnState] = useState(true);
  const editBtn = () => {
    setBtnState(!btnState);
    const findData = dataFormat.filter((it) => {
      return it.isChosen == true;
    });
    findData[0].isClick = !findData[0].isClick;
    setDataFormat(JSON.parse(JSON.stringify(dataFormat)));
    console.log(findData);
  };
  const confirmBtn = () => {
    const a = window.confirm("确定更改吗");
    if (a === true) {
      setBtnState(!btnState);
      const findData = dataFormat.filter((it) => {
        return it.isChosen == true;
      });
      findData[0].isClick = !findData[0].isClick;
      
      
    } else {
    }
  };
  const deleteBtn = () => {
    const a = window.confirm("确定删除吗");
    if (a ===true) {
      const findData = dataFormat.filter((it) => {
        return it.isChosen == true;
      });
      console.log(true)
    findData[0].isDelete = true;
    
    setDataFormat(JSON.parse(JSON.stringify(dataFormat)));
    
    
    }
    else{
      
    }
    
  };

  const options = [
    {
      value: "1",
      label: "默认预览",
    },
    {
      value: "2",
      label: "按岗位分组",
      children: [{}],
    },
    {
      value: "3",
      label: "按职责分组",
      children: [{}],
    },
    {
      value: "4",
      label: "按人员分组",
      children: [],
    },
  ];
  //eslint
  // console.log(e.target.innerText.slice(0,5))
  // if(e.target.innerText.slice(0,))

  const judgeDay = (date) => {
    return dayData[date];
  };

  //总人数
  useEffect(() => {
    axios.get(api_getList + params).then((res) => {
      //   const demo = new Date(res.data[0].date);
      //   console.log(judgeDay(demo.getDay()));

      setDataFormat(
        res.data.map((format) => {
          return {
            id: format.id,
            startTime: format.startTime,
            endTime: format.endTime,
            date: format.date,
            type: format.type,
            employeeList: format.employeeList,
            isChosen: false,
            isClick: false,
            isDelete:false
          };
        })
      );
    });
  }, [startDayAndEndDay]);

  const generatedays = () => {
    const clickFun = (value) => {
      const index = dataFormat.findIndex((it) => it.id === value);
      if(dataFormat[index].isClick===true){}
      else{
      dataFormat[index].isChosen = !dataFormat[index].isChosen;
    }
      console.log(dataFormat);
      setDataFormat(JSON.parse(JSON.stringify(dataFormat)));

      // return [...dataFormat].slice()
    };
    return dayData.map((item) => {
      return (
        <div style={{ display: "inline-block" }}>
          <Card
            key={uuidv4()}
            style={{
              width: "200px",
              lineHeight: "8px",
              height: "100px",
            }}
            size={"small"}
          >
            <p>{item}</p>
          </Card>

          {dataFormat.map((everyInfo) => {
            const {
              id,
              startTime,
              endTime,
              date,
              type,
              employeeList,
              isChosen,
            } = everyInfo;

            if (judgeDay(new Date(date).getDay()) == item)
              return (
                <CardBox
                  key={uuidv4()}
                  cardStyle={isChosen}
                  size={"small"}
                  content={everyInfo}
                  clickFun={clickFun}
                ></CardBox>
              );
          })}
          {}
        </div>
      );
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          textAlign: "left",
          justifyContent: "space-between",
        }}
      >
        <Cascader
          options={options}
          onChange={handleChange}
          placeholder="Please select"
        />
        <Button style={{ marginLeft: "auto" }} onClick={deleteBtn} danger>
          删除
        </Button>

        <Button type="primary" onClick={btnState ? editBtn : confirmBtn}>
          {btnState ? "编辑" : "确定"}
        </Button>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        {generatedays()}
      </div>
    </div>
  );
}

export default Table2;

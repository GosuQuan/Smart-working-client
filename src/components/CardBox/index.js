import React from "react";
import { Card ,Select} from "antd";

function CardBox(props) {
  const { clickFun, content, cardStyle} = props;
  const { employeeList,isClick,isDelete, } = content;
  const handleClick = () => {
    // console.log(content.id);
    clickFun(content.id);
  };
  return (
    <div>
      <Card style={{color:cardStyle?"blue":"red"}} size="small" onClick={handleClick}>
        {employeeList.map((employeeInfo) => {
          return (
            isDelete?<p>"开放班次"</p>:<p>
              姓名：{isClick?<Select></Select>:employeeInfo.name}，职位:{employeeInfo.position}
              
            </p>
            //选中？如果选中，继续判断
          );
        })}
      </Card>
    </div>
  );
}

export default CardBox;

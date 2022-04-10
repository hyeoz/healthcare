import axios from "axios";
import { useEffect, useState } from "react";

const Detail = ({ id }) => {
  const [detailData, setDetailData] = useState();

  const getDetail = async () => {
    try {
      const res = await axios.get(
        `http://49.50.167.136:9871/api/patient/brief/${id}`
      );
      // console.log(res);
      setDetailData(res.data);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  // console.log(detailData);

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div>
      <p>전체 방문 수 : {detailData?.visitCount}</p>
      <p>진단 정보</p>
      {detailData?.conditionList.map((data) => {
        return <p>{data}</p>;
      })}
    </div>
  );
};

export default Detail;

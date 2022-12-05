import axios from "axios";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import "./QrScanner.css";

type Equipment = {
  equipmentTableId: bigint;
  title: string;
  responsibleName: string;
  avatar: string;
};

const QrScanner = () => {
  const [data, setData] = useState<Equipment>();

  return (
    <div className="result">
      <QrReader
        containerStyle={{ width: "20rem" }}
        onResult={(result, error) => {
          if (!!result) {
            if (!result.toString().includes("89.110.53.87")) setData(data);
            else {
              axios.get(result.toString()).then((resp) => setData(resp.data));
            }
          }
          if (!!error) {
            console.log(error.message);
          }
        }}
        constraints={{ facingMode: "environment" }}
      />
      {data == null ? (
        <p>No result</p>
      ) : (
        <div className="result">
          <p>{data.title}</p>
          <p>{data.responsibleName}</p>
          <img src={data.avatar} />
        </div>
      )}
    </div>
  );
};

export default QrScanner;

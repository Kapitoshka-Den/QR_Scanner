import { useState } from "react";
import { QrReader } from "react-qr-reader";


const QrScanner = () => {
  const [data, setData] = useState("No result");

  return (
    <div>
      <QrReader
        containerStyle={{width:'20rem'}}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.getText());
          }
          if (!!error) {
            console.log(error.message);
          }
        }}
        constraints={{ facingMode: "environment" }}
      />
      <p>{data}</p>
    </div>
  );
};

export default QrScanner;

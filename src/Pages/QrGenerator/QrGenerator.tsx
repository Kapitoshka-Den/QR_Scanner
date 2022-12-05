import axios from "axios";
import { type } from "os";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useLocation, useParams } from "react-router-dom";
import "./QrGenerator.css";

type Equipment = {
  equipmentTableId: bigint;
  title: string;
  responsibleName: string;
  avatar: string;
};

type props = {
  equipId:number
}

var equipTest: Equipment = {
  equipmentTableId: 12 as unknown as bigint,
  title: "Загрузка...",
  responsibleName: "Загрузка...",
  avatar: "",
};

// let test = Buffer.from(equipTest.avatar,'base64')
// let imgData = new Blob(test.buffer,{ type: 'application/octet-binary' });
// let link = URL.createObjectURL(imgData);

const QrGenerator = () => {
  const [appState, setAppState] = useState<Equipment>(equipTest);
  const [qrValue, setQrValue] = useState("");

  const test = useParams();


  const dowloadQrCode = () => {
    const canvasUrl = (document.getElementById('qrCodeImg') as HTMLCanvasElement)?.toDataURL() ;
    console.log(canvasUrl);
  };

  useEffect(() => {
    

    const url = "http://89.110.53.87:5000/api/Equipment/GetEquipmentById?id=" + test.equipId;
    console.log(url);
    axios
      .get(url)
      .then((resp) => {
        const equipment = resp.data;
        setAppState(equipment);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }, [test.equipId]);

  return (
    <div className="mainContainer">
      <div>
        <img
          src={"data:image/png;base64," + appState.avatar}
          style={{ width: "30%" }}
        />
        <p>{appState.title}</p>
        <p>{appState.responsibleName}</p>
      </div>
      <div className="qrCode">
        <QRCode
          value={`https://localhost:7124/api/Equipment/GetEquipmentById?id=${appState.equipmentTableId}`}
          level="H"
          size={300}
          className="qrCode"
          id="qrCodeImg"
        />
        <button type="button" onClick={dowloadQrCode}>
          Download
        </button>
      </div>
    </div>
  );
};
export default QrGenerator;

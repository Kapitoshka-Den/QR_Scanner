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
  equipId: number;
};

var equipTest: Equipment = {
  equipmentTableId: 12 as unknown as bigint,
  title: "Загрузка...",
  responsibleName: "Загрузка...",
  avatar: "",
};

const QrGenerator = () => {
  const [appState, setAppState] = useState<Equipment>(equipTest);
  const [qrValue, setQrValue] = useState("");

  const test = useParams();

  const dowloadQrCode = () => {
    const canvasUrl = document.getElementById("qrCodeImg") as HTMLCanvasElement;
    const svgData = new XMLSerializer().serializeToString(canvasUrl);
    console.log(svgData);
    

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx!.drawImage(img, img.width, img.height);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  useEffect(() => {
    const url =
      "http://89.110.53.87:5000/api/Equipment/GetEquipmentById?id=" +
      test.equipId;
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
          value={`http://89.110.53.87:5000/api/Equipment/GetEquipmentById?id=${appState.equipmentTableId}`}
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

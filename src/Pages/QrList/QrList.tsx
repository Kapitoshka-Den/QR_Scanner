import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

type Equipment = {
  equipmentTableId: bigint;
  title: string;
  responsibleName: string;
  avatar: string;
};

const QrList = () => {
  const [equipList, setEquipList] = useState<Array<Equipment>>();

  useEffect(() => {
    const url = "https://localhost:7124/api/Equipment/GetEquipments";

    axios
      .get(url)
      .then((resp) => {
        setEquipList(resp.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      {equipList?.map((equip) => (
        <NavLink
        
          to={"/qrgenerate/"+equip.equipmentTableId}
          style={{ display: "flex", flexFlow: "row" }}
          key={equip.equipmentTableId as unknown as number}
        >
          <img
            src={"data:image/png;base64," + equip.avatar}
            style={{ width: "10%" }}
          />
          <div>
            <p>{equip.title}</p>
            <p>{equip.responsibleName}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default QrList;

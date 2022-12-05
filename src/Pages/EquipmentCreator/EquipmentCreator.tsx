import axios from "axios";
import { read } from "fs";
import React, { useState } from "react";
import notFoundImg from "./notfoundimg.png";

const EquipmentCreator = () => {
  const [imgSrc, setImgSrc] = useState<string>();
  var EquipCreate = {
    title: "",
    name: "",
    avatar: "",
  };

  let testmsg = "";

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.id;

    if (name == "title") {
      EquipCreate.title = e.target.value;
    }
    if (name == "name") {
      EquipCreate.name = e.target.value;
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", flexFlow: "column" }}>
      <img src={imgSrc == null ? notFoundImg : imgSrc} />
      <input
        type="file"
        id="fileInput"
        onChange={(e) => {
          let test = e.currentTarget.files?.item(0) as File;
          if (test != null) {
            setImgSrc(URL.createObjectURL(test));
            var reader = new FileReader();
            reader.onload = function() {
              var base64string = reader.result;
              EquipCreate.avatar =
                base64string
                  ?.toString()
                  .replace("data:image/png;base64,", "") ?? "";
            };
            reader.readAsDataURL(test);
            console.log(EquipCreate);
          }
        }}
      />
      <input id="title" onBlur={onBlur} />
      <input id="name" onBlur={onBlur} />
      <input
        type="submit"
        onClick={() =>
          axios
            .post(
              "http://89.110.53.87:5000/api/Equipment/CreateEquipment",
              EquipCreate
            )
            .then((response) => console.log(response.status))
            .catch((error) => console.log(EquipCreate))
        }
      />
    </div>
  );
};

export default EquipmentCreator;

import axios from "axios";
import { read } from "fs";
import React, { useState } from "react";
import notFoundImg from "./notfoundimg.png";

const EquipmentCreator = () => {
  const [imgSrc, setImgSrc] = useState<string>();
  const [title,setTitle] = useState<string>();
const [name,setName] = useState<string>();

  let testmsg = "";

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.id;

    if (name == "title") {
        setTitle(e.target.value)
    }
    if (name == "name") {
        setName(e.target.value)
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
            var reader = new FileReader();
            reader.onload = (): void => {
              var base64string = reader.result ?? "";
              console.log(base64string);

            setImgSrc(base64string.toString());

              setImgSrc(
                base64string
                    .toString()
                    );

            console.log(imgSrc);

            };
            reader.readAsDataURL(test);
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
              "https://localhost:7124/api/Equipment/CreateEquipment",
              {
                title:title,
                avatar:imgSrc!.replace("data:image/png;base64,", ""),
                responsibleName:name

              }
            )
            .then((response) => console.log(response.status))
            .catch((error) => {
                console.log(error.message);
                
                console.log(imgSrc)
                console.log(title);
                
            })
        }
      />
    </div>
  );
};

export default EquipmentCreator;

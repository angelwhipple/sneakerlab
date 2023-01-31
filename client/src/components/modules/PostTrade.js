import React from "react";
import "../pages/Trade.css";
import { post } from "../../utilities";
import { useState } from "react";

const PostTrade = (props) => {
  const [temp_name, setTempName] = useState("");
  const [temp_size, setTempSize] = useState("");
  const [temp_image, setTempImage] = useState("");
  const [temp_colorway, setTempColorway] = useState("");
  const [temp_brand, setTempBrand] = useState("");
  const [temp_retail, setTempRetail] = useState("");

  let [prompt, prompt2] = ["", ""];
  if (props.postOrReply == "post") {
    prompt = "create a new trade listing";
    prompt2 = "post";
  } else {
    prompt = "make a trade request";
    prompt2 = "reply";
  }

  const handleInput_name = (event) => {
    setTempName(event.target.value);
  };
  const handleInput_size = (event) => {
    setTempSize(event.target.value);
  };
  const handleInput_colorway = (event) => {
    setTempColorway(event.target.value);
  };
  const handleInput_brand = (event) => {
    setTempBrand(event.target.value);
  };
  const handleInput_retail = (event) => {
    setTempRetail(event.target.value);
  };
  const handleInput_image = (event) => {
    setTempImage(event.target.files[0]);
  };

  return (
    <>
      <h2 className="u-textCenter">{prompt}</h2>
      <div className="inputs-Container">
        <label>shoe name</label>
        <input type="text" placeholder="enter name of shoe" onChange={handleInput_name}></input>
        <label>size</label>
        <input type="text" placeholder="enter shoe size" onChange={handleInput_size}></input>
        <label>colorway</label>
        <input type="text" placeholder="enter color(s)" onChange={handleInput_colorway}></input>
      </div>
      <div className="inputs-Container">
        <label>brand</label>
        <input type="text" placeholder="enter brand" onChange={handleInput_brand}></input>
        <label>retail</label>
        <input type="text" placeholder="enter numeric value" onChange={handleInput_retail}></input>
        <label>image</label>
        <input type="file" accept="image/*" onChange={handleInput_image} />
      </div>
      <div className="centerButton">
        <button
          className="u-pointer"
          onClick={() => {
            const shoeImage = document.createElement("img");
            shoeImage.src = URL.createObjectURL(temp_image);
            if (props.postOrReply == "post") {
              post("/api/createtrade", {
                id: props.userId,
                name: temp_name,
                size: temp_size,
                colorway: temp_colorway,
                brand: temp_brand,
                retail: temp_retail,
                image: shoeImage.src,
              });
            } else {
              post("/api/replytrade", {
                id: props.userId,
                name: temp_name,
                size: temp_size,
                colorway: temp_colorway,
                brand: temp_brand,
                retail: temp_retail,
                image: shoeImage.src,
                originalTrade: props.postOrReply,
              });
            }
            props.setViewListings(true);
            props.setMakeListing(false);
          }}
        >
          {prompt2}
        </button>
      </div>
    </>
  );
};

export default PostTrade;

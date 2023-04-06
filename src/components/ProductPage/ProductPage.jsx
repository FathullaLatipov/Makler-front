import React from "react";
import "./ProductPage.css";
import logo from "../../assets/img/icon.svg";
import freeze from "../../assets/img/freeze.png";
import { Link } from "react-router-dom";

export default function ProductCard({ data }) {
  return (
    <Link
      to={`/industria/${data.id}`}
      style={{
        display: "block",
        marginTop: "1rem",
      }}
    >
      <div className="product-card">
        <div className="header-card">
          <img
            className="logo"
            src={data.brand_image ? data.brand_image : logo}
            alt="logotip"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
          <span className="product-title">{data?.brand_title?.title}</span>
        </div>
        <div className="product-main">
          <img
            src={data?.image ? data.image : freeze}
            alt="freeze"
            style={{
              // maxWidth: "340px",
              maxHeight: "237px",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="product-footer">
          <div className="product-info">
            <p
              className="product-name"
              style={{
                // backgroundColor: "orange",
                lineHeight: "2rem",
              }}
            >
              {data.name}
            </p>
            <em className="product-type">{data.use_for?.title}</em>
          </div>
          <p className="product-price">{data.price}$</p>
        </div>
      </div>
    </Link>
  );
}

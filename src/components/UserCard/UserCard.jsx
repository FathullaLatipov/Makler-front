import React from "react";
import "./UserCard.css";
import UserImg from "../../assets/img/avatar-big.png";
import { Link } from "react-router-dom";

const UserCard = ({ data, mebel }) => {
  return (
    <Link
      to={
        !mebel
          ? `/master/${"pk" in data ? data?.pk : data?.id}`
          : `/mebel/${data?.id}`
      }
    >
      <div
        className="main-card"
        style={{
          marginTop: "1rem",
        }}
      >
        <div className="master-card">
          {!mebel ? (
            <img
              src={"avatar" in data ? data.avatar : data.image}
              alt="User image"
              // width={"40px"}
              // height="40px"
              style={{
                objectFit: "cover",
                width: "100%",
                maxHeight: "14rem",
                borderRadius: "5px 5px 0 0",
              }}
            />
          ) : (
            <img
              src={data?.images[0]?.images}
              alt="User image"
              // width={"40px"}
              // height="40px"
              style={{
                objectFit: "cover",
                width: "100%",
                maxHeight: "14rem",
                borderRadius: "5px 5px 0 0",
              }}
            />
          )}
          <div className="user-card">
            <div className="user-info">
              <h4 className="user-name">{!mebel ? data.name : data.title}</h4>
              {mebel ? (
                <p className="user-level">{data?.short_descriptions}</p>
              ) : (
                <p className="user-level">
                  Мастер, {data.experience} года опыта
                </p>
              )}
            </div>
            <div className="info-cards">
              {!mebel ? (
                data?.profession?.map((item) => (
                  <span
                    className="info-box"
                    style={{
                      color: "black",
                    }}
                    key={item.title}
                  >
                    {item.title}
                  </span>
                ))
              ) : (
                <span
                  className="info-box"
                  style={{
                    color: "black",
                  }}
                >
                  {data?.category?.title}
                </span>
              )}
            </div>
            {mebel ? (
              <p className="user-loc">
                {data?.price} {data?.price_type?.price_t}
              </p>
            ) : (
              <p className="user-loc">{data.address_title}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;

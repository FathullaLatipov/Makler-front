import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sprite from "../../assets/img/symbol/sprite.svg";
import img from "../../assets/img/slider/1.png";

function CustomLeftArrow({ className, style, onClick }) {
  return (
    <svg
      className={`${className} svg-sprite-icon icon-left-arr fill-n`}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <use href={`${sprite}#left-arr`}></use>
    </svg>
  );
}
function CustomRightArrow({ className, style, onClick }) {
  return (
    <svg
      className={`${className} svg-sprite-icon icon-left-arr fill-n`}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <use href={`${sprite}#left-arr`}></use>
    </svg>
  );
}
const SliderContent = ({ imgUrl }) => {
  return (
    <Slider
      infinite
      dots
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      nextArrow={<CustomRightArrow />}
      prevArrow={<CustomLeftArrow />}
    >
      {imgUrl?.map((img, i) => (
        <div
          key={i}
          style={{
            height: "100%",
            width: "100%",
          }}
        >
          <img
            src={img.images || img}
            alt={img}
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default SliderContent;

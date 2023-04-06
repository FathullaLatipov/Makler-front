import { Filter, Houses } from "../../components";
import sprite from "../../assets/img/symbol/sprite.svg";
import useForm from "../../hooks/useForm";
import { useState } from "react";

const AllProducts = () => {
  const { form, changeHandler } = useForm({
    typeRoom: "",
    room: "",
    building: "",
    search: "",
    sort: "",
  });
  const [show1, setShow1] = useState(false);
  return (
    <div className="content">
      <div className="container">
        <div
          style={{
            padding: "2rem 0",
          }}
        >
          <Filter value={form} change={changeHandler} />
          <div
            className="form-price"
            style={{
              marginTop: "1rem",
            }}
          >
            <div></div>
            <div className="form-price-choose">
              <button
                className="choose-currency"
                type="button"
                id="select-currency"
                style={{
                  background: "transparent",
                  border: "none",
                  // fontWeight: "600",
                }}
                onClick={() => setShow1((prev) => !prev)}
              >
                Сортировка
                <svg className="svg-sprite-icon icon-fi_chevron-down w-12">
                  <use href={`${sprite}#fi_chevron-down`}></use>
                </svg>
              </button>
              <div className={`nav-body-choose ${show1 && "active"}`}>
                <ul>
                  {[
                    { id: "price", text: "Дешевые" },
                    { id: "-price", text: "Дорогие" },
                    { id: "created_at", text: "Новые" },
                  ].map((item) => (
                    <div>
                      <label
                        htmlFor={item.text}
                        className={`labelcha ${
                          item.id === form.sort ? "active" : ""
                        }`}
                        style={{
                          padding: "0.9rem 0.8rem",
                        }}
                      >
                        {item.text}
                      </label>
                      <input
                        key={item.id}
                        type="text"
                        id={item.text}
                        name="sort"
                        onClick={(e) => {
                          changeHandler(e);
                          setShow1(false);
                          // setPriceText(item.text);
                        }}
                        value={item.id}
                        readOnly
                        style={{
                          display: "none",
                        }}
                      />
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Houses value={form} />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

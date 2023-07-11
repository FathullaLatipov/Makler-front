import "./LoginModal.scss";
import modalSvg from "../../assets/img/svg/30.svg";
import sprite from "../../assets/img/symbol/sprite.svg";
import useForm from "../../hooks/useForm";
import { baseURL } from "../../requests/requests";
import { useContext, useEffect, useState } from "react";
import ContextApp from "../../context/context";
import { toast } from "react-toastify";
import $host from "../../http";
import PhoneInput from "../PhoneInput/PhoneInput";
import usePrevious from "../../hooks/usePreviosState";

const LoginModal = () => {
  const { loginModalFunc, getUserId } = useContext(ContextApp);
  const [ step, setStep ] = useState(1);
  const prevStep = usePrevious(step);
  

  const [da, setDa] = useState();
  const { form, changeHandler } = useForm({
    number: "",
    password: "",
    confirm_password: "",
    opt_code: "",
  });


  const handeSubmit = (e) => {
    e.preventDefault();
    const { password, confirm_password, number } = form;

    if(step === 2) {
      if(!number.trim() || !password.trim() || !confirm_password.trim()) {
        toast.error('Все поля должны быть заполнены');
      }
      if(password !== confirm_password) {
        toast.error("Ваш пароль не совпадает");
      }
    
      $host
        .post(`/authorization/signup/`, {
          phone_number: number,
          password: password,
        })
        .then(({ data }) => {
          localStorage.setItem("access", data.token?.access);
          localStorage.setItem("userId", data.token?.id);
          // setDa(data);
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => {
          // loginModalFunc(false);
          // window.location.reload();
        });
    }
    
  };

  const changeStep = (step) => {
    setStep(step);
  }

  const toBackFromThirdStep = () => {
    setStep(prevStep);
  }

  return (
    <div className="modal login-modal">
      <div className="modal-body">
        {" "}
        <span
          className="close-btn"
          href="#"
          onClick={() => loginModalFunc(false)}
          style={{
            cursor: "pointer",
          }}
        >
          <svg className="svg-sprite-icon icon-close">
            <use href={`${sprite}#close`}></use>
          </svg>
        </span>

        {step === 1 ? (
          <>
            <h4>Войти</h4>
            <p>
              Пожалуйста, введите номер телефона, который подтвердил вашу учетную
              запись!
            </p>
            <div className="alert-form">
              <img src={modalSvg} alt="30 days" />
              <p>
                Вы имеете право размещать бесплатные объявления в течение 30 дней
                после регистрации! Спасибо, что выбрали нас!
              </p>
            </div>
            <form onSubmit={handeSubmit}>
              <div className="form-input">
                <PhoneInput 
                  labelName="Номер телефона" 
                  changeHandler={changeHandler}
                  value={form.number}
                />

                <label className="mt-4">Пароль</label>
    
                <input
                  type="password"
                  name="password"
                  onChange={changeHandler}
                  value={form.password}
                />

                <button className="btn btn-orange">
                  Войти
                </button>
              </div>
            </form>

            <div className="default-link" onClick={() => changeStep(2)}>Зарегистрироваться</div>
          </>
        ) : step === 2 ? (
          <>
            <h4>Зарегистрироваться</h4>
            <p>
              Пожалуйста, введите номер телефона, который подтвердил вашу учетную
              запись!
            </p>
            <div className="alert-form">
              <img src={modalSvg} alt="30 days" />
              <p>
                Вы имеете право размещать бесплатные объявления в течение 30 дней
                после регистрации! Спасибо, что выбрали нас!
              </p>
            </div>
            <form onSubmit={handeSubmit}>
              <div className="form-input">
                <PhoneInput 
                  labelName="Номер телефона" 
                  changeHandler={changeHandler}
                  value={form.number}
                />

                <label className="mt-4">Пароль</label>
    
                <input
                  type="password"
                  name="password"
                  onChange={changeHandler}
                  value={form.password}
                />

                <label className="mt-4">Подвердите пароль</label>

                <input
                  type="password"
                  name="confirm_password"
                  onChange={changeHandler}
                  value={form.confirm_password}
                />

                <button className="btn btn-orange">
                  {/* Подтвердить номер телефона */}
                  Зарегистрироваться
                </button>
              </div>
            </form>

            <div className="default-link" onClick={() => changeStep(1)}>Войти</div>
          </>
        ) : step === 3 && (
          <>
            <h4>Подтвердите свой номер телефона!</h4>
            <p>
              На указанный номер телефона отправлено СМС с кодом.<br/> Подтвердите этот код!
            </p>

            <form onSubmit={handeSubmit}>
              <div className="form-input">
                <label className="mt-4">СМС код</label>
    
                <input
                  type="text"
                  name="opt_code"
                  onChange={changeHandler}
                  value={form.opt_code}
                />

                <button className="btn btn-orange">
                  Войти в профиль
                </button>
              </div>
            </form>

            <div className="default-link" onClick={toBackFromThirdStep}>Вернуться назад</div>
          </>
        )}
        

      </div>
    </div>
  );
};

export default LoginModal;

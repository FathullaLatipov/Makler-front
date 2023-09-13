import "./LoginModal.scss";
import modalSvg from "../../assets/img/svg/30.svg";
import sprite from "../../assets/img/symbol/sprite.svg";
import useForm from "../../hooks/useForm";
import {useContext, useEffect, useState} from "react";
import ContextApp from "../../context/context";
import { toast } from "react-toastify";
import $host from "../../http";
import PhoneInput from "../PhoneInput/PhoneInput";
import usePrevious from "../../hooks/usePreviosState";
import {useCookies} from "react-cookie";
import { useTranslation } from "react-i18next";

const LoginModal = () => {
  const { loginModalFunc, getUserId, fromUser } = useContext(ContextApp);
  const [ step, setStep ] = useState(1);
  const prevStep = usePrevious(step);
  const [cookie, setCookie] = useCookies();
  const { t } = useTranslation();
  
  const [da, setDa] = useState();
  const { form, changeHandler } = useForm({
    number: "",
    password: "",
    confirm_password: "",
    opt_code: "",
  });

  const setError = (error) => {
    if(error.response.data) {
      
      return Object.keys(error.response.data).forEach((key) => {
        toast.error(error.response.data[key]);
      });
    }
    toast.error("Something went wrong!");
  };

  const sendOptCode = async (optCode, number) => {
    try {
      const { data } = await $host.post('/authorization/api/v1/confirmation/', {
        confirmation_code: optCode,
        phone_number: number,
      });
      if(data.error) {
        return toast.error(data.error);
      }
      localStorage.setItem("access", data.access);
      localStorage.setItem("userId", data.id);
      setCookie("refreshToken", data.refresh, { path: "/", maxAge: 1000 * 60 * 60 * 24 * 7 });
      window.location.reload();
    } catch (error) {
      setError(error);
    }
  };

  const handeSubmit = async (e) => {
    e.preventDefault();
    const { password, confirm_password, number, opt_code } = form;

    if(step === 3) {
      return sendOptCode(opt_code, number);
    }

    try {
      if(step === 1) {
        if(!number.trim() || !password.trim()) {
          return toast.error('Все поля должны быть заполнены');
        }
        const { data } = await $host.post('/authorization/api/v1/login/', { 
          phone_number: number,
          password: password,
        });
        localStorage.setItem("access", data.access);
        localStorage.setItem("userId", data.id);
        setCookie("refreshToken", data.refresh, { path: "/", maxAge: 1000 * 60 * 60 * 24 * 7 });
        window.location.reload();
      }
  
      if(step === 2) {
        if(!number.trim() || !password.trim() || !confirm_password.trim()) {
          return toast.error('Все поля должны быть заполнены');
        }
        if(password !== confirm_password) {
          return toast.error("Ваш пароль не совпадает");
        }
        await $host
          .post(`/authorization/signup/${fromUser ? `?referrer=${fromUser}` : ''}`, {
            phone_number: number,
            password: password,
          });
        setStep(3);
      }
      
    } catch (error) {
      if(Object.keys(error.response.data).length > 0) {
        return Object.keys(error.response.data).forEach((key) => {
          if(Array.isArray(error.response.data[key])) {
            return toast.error(`${key}: ${error.response.data[key].join('')}`);
          }
          return toast.error(error.response.data[key]);
        });
      }
      toast.error("Something went wrong!");
    } 
  };

  const changeStep = (step) => {
    setStep(step);
  }

  const toBackFromThirdStep = () => {
    setStep(prevStep);
  }

  useEffect(() => {
    if(step === 1) {
      window.document.title = "Логин";
    } else if(step === 2) {
      window.document.title = "Регистрация";
    } else if(step === 3) {
      window.document.title = "Подтверждение кода";
    }
  }, [step]);

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
            <h4>{t("login.signIn")}</h4>
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
                  labelName={t("editPage.phoneNumber")}
                  changeHandler={changeHandler}
                  value={form.number}
                />

                <label className="mt-4">{t("editPage.password")}</label>
    
                <input
                  type="password"
                  name="password"
                  onChange={changeHandler}
                  value={form.password}
                />

                <button className="btn btn-orange">
                  {t("login.signIn")}
                </button>
              </div>
            </form>

            <div className="default-link" onClick={() => changeStep(2)}>{t("login.register")}</div>
          </>
        ) : step === 2 ? (
          <>
            <h4>{t("login.register")}</h4>
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
                  labelName={t("editPage.phoneNumber")} 
                  changeHandler={changeHandler}
                  value={form.number}
                />

                <label className="mt-4">{t("editPage.password")}</label>
    
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
                  {t("login.register")}
                </button>
              </div>
            </form>

            <div className="default-link" onClick={() => changeStep(1)}>{t("login.signIn")}</div>
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

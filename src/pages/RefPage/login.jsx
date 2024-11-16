import React, { useEffect, useState } from 'react';
import FormSignUp from './form';
import Otp from './otp';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
const LoginPageRef = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref');
  useEffect(() => {
    if (ref) {
      localStorage.setItem('ref', ref);
    }
  }, [ref]);
  const [active, setActive] = useState(true);
  const submit = async value => {
    await axios
      .post('https://api.makleruz.uz/authorization/signup/', value)
      .then(res => {
        localStorage.setItem('phone', value.phone_number);
        setActive(false);
      })
      .catch(err =>
        enqueueSnackbar(`Xatolik: ${err.response.data.phone_number}`, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        })
      );
  };
  const sendCode = async value => {
    console.log(value);
    console.log('saki');
    await axios
      .post('https://api.makleruz.uz/authorization/api/v1/confirmation/', {
        ...value,
        phone_number: localStorage.getItem('phone'),
      })
      .then(res => {
        localStorage.setItem('access_token', res.data.access);
        navigate(`/download?ref=${ref}`);
      })
      .catch(err => {
        enqueueSnackbar(`Xatolik: ${err}`, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
          autoHideDuration: 2000,
        });
      });
    localStorage.removeItem('phone');
  };
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      {active ? (
        <FormSignUp submit={submit} isPending={false} />
      ) : (
        <Otp submit={sendCode} isPending={false} />
      )}
    </div>
  );
};

export default LoginPageRef;

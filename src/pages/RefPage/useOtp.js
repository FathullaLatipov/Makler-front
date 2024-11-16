import axios from 'axios';
import { useMutation } from 'react-query';
import { enqueueSnackbar } from 'notistack';

const sendOtp = async value => {
  await axios
    .post('https://api.makleruz.uz/authorization/api/v1/confirmation/', value)
    .then(res => {
      localStorage.setItem('access_token', res.data.access);
    })
    .catch(err => {
      console.log(err);
    });
};

export const useSendOtp = () => {
  const { isPending, mutateAsync } = useMutation({
    mutationFn: value => sendOtp(value),

    onSuccess: () => {
      enqueueSnackbar('Muvaffaqiyatli ro`yxatan o`tdingiz', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 2000,
      });
    },
    onError: err => {
      console.log(err);
      enqueueSnackbar(`${err}`, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 2000,
      });
    },
  });

  return {
    isPending,
    sendOtp: mutateAsync,
  };
};

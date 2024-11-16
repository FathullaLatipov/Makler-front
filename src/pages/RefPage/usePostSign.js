import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from 'react-query';

const signUp = async values => {
  return await axios
    .post('https://api.makleruz.uz/authorization/signup/', values)
    .then(res => {
      return console.log(res);
    })
    .catch(err => console.log(err));
};

export const useSignUp = () => {
  const { isLoading, mutateAsync } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      enqueueSnackbar('Kod yuborildi', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        autoHideDuration: 2000,
      });
    },
    onError: error => {
      const message =
        error.response?.data?.message || error.message || 'An error occurred';
      console.error('Error details:', error.response?.data || error);
      enqueueSnackbar(`Xatolik: ${message}`, {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        autoHideDuration: 2000,
      });
    },
  });

  return {
    isPending: isLoading,
    signUp: mutateAsync,
  };
};

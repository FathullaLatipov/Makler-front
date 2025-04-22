import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUPScheme } from './scheme';
import Logo from '../../assets/img/logo_site2.png';
import { memo, useCallback } from 'react';
import BG from '../../assets/img/main-bg.png';

const FormSignUp = memo(({ submit, isPending }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: '',
      password: '',
    },
    resolver: zodResolver(signUPScheme),
  });

  const onSubmit = useCallback(
    async values => {
      const phone = values.phone_number.replace(/\s+/g, '').substring(4, 13);
      localStorage.setItem('phone', phone);
      await submit({ ...values, phone_number: phone });
    },
    [submit]
  );

  return (
    <div className="form-wrapper">
      <img
        src={BG}
        alt=""
        className="w-full h-screen absolute top-0 left-0 object-cover"
      />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 w-[400px] relative bg-white rounded-xl shadow-xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Referal link bo'yicha ro'yxatdan o'ting
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="phone_number"
                className="block text-lg/6 font-medium text-gray-900"
              >
                Telefon raqami
              </label>
              <div className="mt-2">
                <input
                  {...register('phone_number')}
                  id="phone_number"
                  type="text"
                  placeholder="Telefon raqamini kiriting"
                  className="text-[13px] block w-full rounded-md border-0 py-3 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f18764] sm:text-sm/6"
                />
                {errors.phone_number && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.phone_number.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-lg/6 font-medium text-gray-900"
              >
                Parol
              </label>
              <div className="">
                <input
                  {...register('password')}
                  id="password"
                  type="password"
                  placeholder="Parolni kiriting"
                  className="text-[13px] block w-full rounded-md px-2 border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f18764] sm:text-sm/6"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                disabled={isPending}
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#f18764] px-3 py-1.5 text-[14px] font-semibold text-white shadow-sm hover:bg-[#f18764] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:[#f18764]"
              >
                {isPending ? 'Yuborilmoqda' : 'Yuborish'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
});

export default FormSignUp;

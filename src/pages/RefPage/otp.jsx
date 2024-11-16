import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { otpScheme } from './scheme';
import Logo from '../../assets/img/logo_site2.png';
import { memo, useCallback } from 'react';
const Otp = memo(({ submit, isPending }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      confirmation_code: '',
    },
    resolver: zodResolver(otpScheme),
  });

  const onSubmit = useCallback(
    async values => {
      await submit(values);
    },
    [submit]
  );
  return (
    <div className="form-wrapper">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 w-[400px]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src={Logo} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            SMS orqali yuborilgan ko'dni kiriting
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="confirmation_code"
                className="block text-sm/6 font-medium text-gray-900"
              >
                SMS kod
              </label>
              <div className="mt-2">
                <input
                  {...register('confirmation_code')}
                  id="confirmation_code"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#f18764] sm:text-sm/6"
                />
                {errors.phone_number && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmation_code.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                disabled={isPending}
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#f18764] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#f18764] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:[#f18764]"
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

export default Otp;

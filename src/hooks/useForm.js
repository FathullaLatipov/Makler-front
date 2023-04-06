import { useState } from "react";

const useForm = (values) => {
  const [form, setForm] = useState(values);

  const changeHandler = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    form,
    changeHandler,
  };
};

export default useForm;

import { isAxiosError } from 'axios';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AuthInputs from './AuthInputs';
import AuthInput from './AuthInput';
import AuthButtons from './AuthButtons';
import AuthButton from './AuthButton';
import api from '../utils/api';
import User from '../types/User';

interface SignInFormProps {
  switchForm: () => void;
}

interface Inputs {
  username: string;
  password: string;
}

function SignInForm({ switchForm }: SignInFormProps) {
  const [responseError, setResponseError] = useState<string | null>(null);
  const formMethods = useForm({
    defaultValues: { username: '', password: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { username, password } = data;

    setResponseError(null);

    try {
      await api.post<{ user: User }>('/auth/sign-in', {
        username,
        password,
      });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        setResponseError(error.response.data.msg);
      } else {
        setResponseError('Operation failed');
      }
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {responseError && (
          <p className="mb-4 font-medium text-red-900">{responseError}</p>
        )}
        <AuthInputs>
          <AuthInput
            type="text"
            placeholder="Username"
            name="username"
            options={{ required: 'Username is required' }}
          />
          <AuthInput
            type="password"
            placeholder="Password"
            name="password"
            options={{ required: 'Password is required' }}
          />
        </AuthInputs>
        <AuthButtons>
          <AuthButton disabled={isSubmitting}>Log in</AuthButton>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={switchForm}
            className="font-medium text-lime-700 hover:text-lime-800"
          >
            Or sign up...
          </button>
        </AuthButtons>
      </form>
    </FormProvider>
  );
}

export default SignInForm;

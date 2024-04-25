import { isAxiosError } from 'axios';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AuthInputs from './AuthInputs';
import AuthInput from './AuthInput';
import AuthButtons from './AuthButtons';
import AuthButton from './AuthButton';
import api from '../utils/api';
import User from '../types/User';

interface SignUpFormProps {
  switchForm: () => void;
}

interface Inputs {
  username: string;
  password: string;
  password2: string;
}

function SignUpForm({ switchForm }: SignUpFormProps) {
  const [responseError, setResponseError] = useState<string | null>(null);
  const formMethods = useForm({
    defaultValues: { username: '', password: '', password2: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { username, password, password2 } = data;

    setResponseError(null);

    try {
      await api.post<{ user: User }>('/auth/sign-up', {
        username,
        password,
        password2,
      });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        setResponseError(error.response.data.errors[0].msg);
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
            options={{
              required: 'Username is required',
              maxLength: {
                value: 24,
                message: 'Username cannot be longer than 24 characters',
              },
            }}
          />
          <AuthInput
            type="password"
            placeholder="Password"
            name="password"
            options={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password needs to be at least 6 characters long',
              },
            }}
          />
          <AuthInput
            type="password"
            placeholder="Repeat password"
            name="password2"
            options={{
              required: 'Password confirmation is required',
              validate: (value, { password }) =>
                value === password || 'Passwords do not match',
            }}
          />
        </AuthInputs>
        <AuthButtons>
          <AuthButton disabled={isSubmitting}>Sign up</AuthButton>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={switchForm}
            className="font-medium text-lime-700 hover:text-lime-800"
          >
            Or log in...
          </button>
        </AuthButtons>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;

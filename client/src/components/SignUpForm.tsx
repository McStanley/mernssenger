import { FormProvider, useForm } from 'react-hook-form';
import AuthInputs from './AuthInputs';
import AuthInput from './AuthInput';
import AuthButtons from './AuthButtons';
import AuthButton from './AuthButton';

interface SignUpFormProps {
  switchForm: () => void;
}

function SignUpForm({ switchForm }: SignUpFormProps) {
  const formMethods = useForm();

  const { handleSubmit } = formMethods;

  const onSubmit = () => {
    alert('submit');
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
          <AuthButton>Sign up</AuthButton>
          <button
            type="button"
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

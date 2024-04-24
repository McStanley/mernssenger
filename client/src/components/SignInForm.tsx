import { FormProvider, useForm } from 'react-hook-form';
import AuthInputs from './AuthInputs';
import AuthInput from './AuthInput';
import AuthButtons from './AuthButtons';
import AuthButton from './AuthButton';

interface SignInFormProps {
  switchForm: () => void;
}

function SignInForm({ switchForm }: SignInFormProps) {
  const formMethods = useForm({
    defaultValues: { username: '', password: '' },
  });

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
          <AuthButton>Log in</AuthButton>
          <button
            type="button"
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

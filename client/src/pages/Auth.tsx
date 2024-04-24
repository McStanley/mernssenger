import { useState } from 'react';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import viteLogo from '/vite.svg';

function Auth() {
  const [showSignIn, setShowSignIn] = useState(true);

  const switchForm = () => setShowSignIn((v) => !v);

  return (
    <div className="m-7 flex flex-1 flex-col">
      <header>
        <img src={viteLogo} alt="" />
      </header>
      <main className="mx-auto mt-28 w-fit flex-1 text-center">
        <h1 className="text-4xl min-[400px]:text-5xl sm:text-6xl">
          <span className="text-green-800">M</span>
          <span className="text-gray-600">e</span>
          <span className="text-blue-400">r</span>
          <span className="text-lime-700">n</span>
          <span>ssenger</span>
        </h1>
        <p className="mt-4 text-gray-700">
          Get connected with your friends – MERN style.
        </p>
        <div className="mt-14">
          {showSignIn ? (
            <SignInForm switchForm={switchForm} />
          ) : (
            <SignUpForm switchForm={switchForm} />
          )}
        </div>
      </main>
      <footer>
        <small className="text-sm">
          <span>© </span>
          <a
            href="https://github.com/McStanley"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Stanisław Olejniczak
          </a>
          <span> 2024.</span>
        </small>
      </footer>
    </div>
  );
}

export default Auth;

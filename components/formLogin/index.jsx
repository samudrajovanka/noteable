import TextInput from '@components/textInput';
import Button from '@components/button';
import Notification from '@components/notification';
import GoogleLogo from '@components/icon/google';
import { useState, useContext } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import NotificationContext from '@context/notification-context';

function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  const handlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlerPassword = (e) => {
    setPassword(e.target.value);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    notificationCtx.showNotification({
      title: 'Loading authentication...',
      status: 'pending',
    });

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!result.error) {
      router.replace('/');
    } else {
      notificationCtx.showNotification({
        title: 'Email or password incorrect',
        status: 'error',
      });
    }
  };

  const handleLoginWithGoogle = () => {
    signIn('google', { callbackUrl: process.env.CALLBACK_URL });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-na-green">Login</h1>
      <p className="text-md text-na-gray mt-1">Welcome to Noteable</p>

      <Notification className="mt-2" />

      <div className="mt-5">
        <form onSubmit={handlerSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <TextInput
              type="email"
              id="email"
              placeholder="Enter your email"
              title="Email"
              value={email}
              onChange={handlerEmail}
              required
            />
            <TextInput
              type="password"
              id="password"
              placeholder="Enter your password"
              title="Password"
              value={password}
              onChange={handlerPassword}
              required
            />

            <Button typeButton="submit" type="primary" color="success">Login</Button>

            <div className="flex felx-row gap-1 items-center">
              <div className="h-0.5 w-full bg-na-gray" />
              <p className="text-na-gray">or</p>
              <div className="h-0.5 w-full bg-na-gray" />
            </div>

            <Button type="secondary" color="success" onClick={handleLoginWithGoogle}>
              <GoogleLogo className="mr-3" />
              Continue With Google
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormLogin;

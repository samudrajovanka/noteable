import TextInput from '@components/textInput';
import Button from '@components/button';
import Notification from '@components/notification';
import GoogleLogo from '@components/icon/google';
import { useState, useContext } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import NotificationContext from '@context/notification-context';
import { fetchApi } from '@lib/fetching';
import { EXIST_DATA, VALIDATION_ERR } from '@lib/constantErrorType';

function FormAuth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [authType, setAuthType] = useState('login');
  const [errorRegister, setErrorRegister] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const router = useRouter();
  const notificationCtx = useContext(NotificationContext);

  const handlerFullname = (e) => {
    setFullname(e.target.value);

    if (e.target.value.length === 0) {
      setErrorRegister((curEl) => ({ ...curEl, fullname: '' }));
    } else if (e.target.value.length < 3) {
      setErrorRegister((curEl) => ({ ...curEl, fullname: 'Full name min 3 character' }));
    } else if (e.target.value.length > 50) {
      setErrorRegister((curEl) => ({ ...curEl, fullname: 'Full name max 50 character' }));
    } else {
      setErrorRegister((curEl) => ({ ...curEl, fullname: '' }));
    }
  };

  const handlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlerPassword = (e) => {
    setPassword(e.target.value);

    if (authType === 'register') {
      if (e.target.value.length === 0) {
        setErrorRegister((curEl) => ({ ...curEl, password: '' }));
      } else if (e.target.value.length < 8) {
        setErrorRegister((curEl) => ({ ...curEl, password: 'Password min 8 character' }));
      } else if (e.target.value.length > 100) {
        setErrorRegister((curEl) => ({ ...curEl, password: 'Password max 100 character' }));
      } else {
        setErrorRegister((curEl) => ({ ...curEl, password: '' }));
      }
    }
  };

  const clearInput = () => {
    setFullname('');
    setEmail('');
    setPassword('');
  };

  const handlerLogin = async () => {
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

  const handlerRegister = async () => {
    setErrorRegister({ fullname: '', email: '', password: '' });
    const body = {
      fullname,
      email,
      password,
    };

    const result = await fetchApi('/api/auth/register', {
      method: 'POST',
      body,
    });

    if (!result.success) {
      if (result.type === EXIST_DATA) {
        setErrorRegister((curEl) => ({ ...curEl, email: result.message }));
      } else if (result.type === VALIDATION_ERR) {
        const errSplit = result.message.split('"');
        if (errSplit[1] === 'password') {
          setErrorRegister((curEl) => ({ ...curEl, password: errSplit[2] }));
        } else if (errSplit[1] === 'fullname') {
          setErrorRegister((curEl) => ({ ...curEl, fullname: errSplit[2] }));
        }
      }
    }

    clearInput();
    setAuthType('login');
    notificationCtx.showNotification({
      title: 'Your account successfully created',
      status: 'success',
    });
    console.log(result);
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (authType === 'login') {
      handlerLogin();
    } else if (authType === 'register') {
      handlerRegister();
    }
  };

  const handlerLoginWithGoogle = () => {
    signIn('google', { callbackUrl: process.env.CALLBACK_URL });
  };

  const handlerChangeRegister = () => {
    clearInput();
    setAuthType('register');
    notificationCtx.hideNotification();
  };

  const handlerChangeLogin = () => {
    setErrorRegister({ fullname: '', email: '', password: '' });
    clearInput();
    setAuthType('login');
    notificationCtx.hideNotification();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-na-green">{authType === 'login' ? 'Login' : 'Register'}</h1>
      <p className="text-md text-na-gray mt-1">
        { authType === 'login' ?
          'Welcome to Noteable' :
          'Create account to access Noteable' }
      </p>

      <Notification className="mt-2" />

      <div className="mt-3">
        <form onSubmit={handlerSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              {authType === 'register' && (
                <TextInput
                  type="text"
                  id="full-name"
                  placeholder="Enter your full name"
                  title="Full Name"
                  value={fullname}
                  onChange={handlerFullname}
                  required
                  errorMsg={errorRegister.fullname}
                />
              )}
              <TextInput
                type="email"
                id="email"
                placeholder="Enter your email"
                title="Email"
                value={email}
                onChange={handlerEmail}
                required
                errorMsg={errorRegister.email}
              />
              <TextInput
                type="password"
                id="password"
                placeholder="Enter your password"
                title="Password"
                value={password}
                onChange={handlerPassword}
                required
                errorMsg={errorRegister.password}
              />
            </div>

            <Button typeButton="submit">
              {authType === 'login' ? 'Login' : 'Register'}
            </Button>

            {authType === 'login' && (
              <p className="text-center">
                Don&apos;t have an account.
                <span className="cursor-pointer text-na-green hover:text-green-500" onClick={handlerChangeRegister}> Register here</span>
              </p>
            )}

            {authType === 'register' && (
              <p className="text-center">
                Have an account.
                <span className="cursor-pointer text-na-green hover:text-green-500" onClick={handlerChangeLogin}> Login here</span>
              </p>
            )}

            <div className="flex felx-row gap-1 items-center">
              <div className="h-0.5 w-full bg-na-gray" />
              <p className="text-na-gray">or</p>
              <div className="h-0.5 w-full bg-na-gray" />
            </div>

            <Button type="secondary" color="success" onClick={handlerLoginWithGoogle}>
              <GoogleLogo className="mr-3" />
              Continue With Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormAuth;

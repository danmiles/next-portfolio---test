'use client';
import React, { useEffect, useState } from 'react';
import styles from '@styles/pages/login.module.css';
import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Loading from '@components/Loading';

const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setError(params.get('error'));
    setSuccess(params.get('success'));
  }, [params]);

  // You can create some skeleton loading here
  if (session.status === 'loading') {
    return <Loading />;
  }

  if (session.status === 'authenticated') {
    router?.push('/dashboard');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn('credentials', {
      email,
      password,
    });
  };

  return (
    <section className={styles.login}>
      <div className={styles.container}>
        <h1 className={styles.title}>{success ? success : 'Welcome Back'}</h1>
        <h2 className={styles.subtitle}>
          Please sign in to see the dashboard.
        </h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Email"
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className={styles.input}
          />
          <button className="button-main">Login</button>
          {error && "Email or password doesn't match."}
        </form>
        <button
          onClick={() => {
            signIn('google');
          }}
          className={`button-main + ' ' + ${styles.google}`}
        >
          Login with Google
        </button>
        <span className={styles.or}>- OR -</span>
        <Link className={styles.link} href="/dashboard/register">
          Create new account
        </Link>
        {/* <button
        onClick={() => {
          signIn("github");
        }}
        className={styles.button + " " + styles.github}
      >
        Login with Github
      </button> */}
      </div>
    </section>
  );
};

export default Login;

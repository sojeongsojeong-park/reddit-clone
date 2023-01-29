import { FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import InputGroup from "../components/InputGroup";
import { useRouter } from "next/router";
import { useAuthDispatch, useAuthState } from "../context/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { authenticated } = useAuthState();
  const [errors, setErrors] = useState<any>({});

  let router = useRouter();

  const dispatch = useAuthDispatch();

  if (authenticated) router.push("/");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/auth/login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      dispatch("LOGIN", res.data?.user);

      router.push("/");
    } catch (error: any) {
      console.error("error: ", error);
      setErrors(error.response.data || {});
    }
  };
  return (
    <div className='bg-white'>
      <div className='flex flex-col items-center justify-content h-screen p-6'>
        <div className='w-10/12 mx-auto md:w-96'>
          <h1 className='mb-2 text-lg font-medium'>로그인</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder='username'
              value={username}
              setValue={setUsername}
              error={errors.username}
            />
            <InputGroup
              placeholder='Password'
              value={password}
              setValue={setPassword}
              error={errors.password}
            />

            <button className='w-full py-2 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded'>
              로그인
            </button>
          </form>
          <small>
            아직 아이디가 없나요?
            <Link href='/register' className='ml-1 text-blue-500 uppercase'>
              회원가입
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;

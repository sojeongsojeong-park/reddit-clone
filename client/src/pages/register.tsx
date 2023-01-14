import { FormEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";
import InputGroup from "../components/InputGroup";
import { useRouter } from "next/router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<any>({});

  let router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/register", {
        email,
        username,
        password,
      });

      console.log(response);

      router.push("/login");
    } catch (error: any) {
      console.error("error: ", error);
      setErrors(error.response.data || {});
    }
  };
  return (
    <div className='bg-white'>
      <div className='flex flex-col items-center justify-content h-screen p-6'>
        <div className='w-10/12 mx-auto md:w-96'>
          <h1 className='mb-2 text-lg font-medium'>회원가입</h1>
          <form onSubmit={handleSubmit}>
            <InputGroup
              placeholder='Email'
              value={email}
              setValue={setEmail}
              error={errors.email}
            />
            <InputGroup
              placeholder='Password'
              value={password}
              setValue={setPassword}
              error={errors.password}
            />
            <InputGroup
              placeholder='username'
              value={username}
              setValue={setUsername}
              error={errors.username}
            />

            <button className='w-full py-2 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded'>
              회원 가입
            </button>
          </form>
          <small>
            이미 가입하셨나요?{" "}
            <Link href='/login' className='ml-1 text-blue-500 uppercase'>
              로그인
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;

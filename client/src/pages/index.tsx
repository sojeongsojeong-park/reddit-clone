import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <p className='text-3xl font-bold underline'>Hello World!</p>
      <Link href='/subs/create'>subs/create</Link>
    </div>
  );
};

export default Home;

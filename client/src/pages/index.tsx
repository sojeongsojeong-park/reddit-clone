import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <p className='text-3xl font-bold underline'>Hello World!</p>
      <Link href='subs/create'>subs/create</Link>
    </div>
  );
};

export default Home;

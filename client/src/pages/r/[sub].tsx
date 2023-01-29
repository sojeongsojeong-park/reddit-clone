import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import useSWR from "swr";

const SubPage = () => {
  const fetcher = async (url: string) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  const router = useRouter();
  const subName = router.query.sub;
  const { data: sub, error } = useSWR(
    subName ? `/subs/${subName}` : null,
    fetcher
  );
  return (
    <>
      {" "}
      {sub && (
        <Fragment>
          <div>
            {/* banner image */}
            <div className='bg-gray-400'>
              {sub.bannerUrl ? (
                <div
                  className='h-56'
                  style={{
                    backgroundImage: `url(${sub.bannerUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              ) : (
                <div className='h-20 bg-gray-400'></div>
              )}
            </div>
            {/* community meta data */}
            <div className='relative flex max-w-5xl px-5 mx-auto'>
              <div className='absolute' style={{ top: -15 }}>
                {sub.imageUrl && (
                  <Image
                    src={sub.imageUrl}
                    alt='community image'
                    width={70}
                    height={70}
                    className='rounded-full'
                  />
                )}
              </div>
              <div className='pt-1 pl-24'>
                <div className='flex items-center'>
                  <h1 className='mb-1 text-3xl font-bold'>{sub.title}</h1>
                </div>
                <p className='font-bold text-gray-400 text-small'>
                  /r/{sub.name}
                </p>
              </div>
            </div>
          </div>
          {/* post and sidebar */}
          <div className='flex max-w-5xl px-4 pt-5 mx-auto'></div>
        </Fragment>
      )}
    </>
  );
};

export default SubPage;

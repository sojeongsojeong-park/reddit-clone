import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import useSWR from "swr";
import { useAuthState } from "../../context/auth";

const SubPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [onSub, setOnSub] = useState(false);
  const { authenticated, user } = useAuthState();

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
  useEffect(() => {
    if (!sub || !user) return;
    setOnSub(authenticated && user.username === sub.username);
  }, [sub]);
  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;

    const file = e.target.files[0];
    console.log("file: ", file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", fileInputRef.current!.name);

    try {
      await axios.post(`/subs/${sub.name}/upload`, formData, {
        headers: { "Context-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const openFileInput = (type: string) => {
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.name = type;
      fileInput.click();
    }
  };
  return (
    <>
      {sub && (
        <Fragment>
          <div>
            <input
              type='file'
              hidden={true}
              ref={fileInputRef}
              onChange={uploadImage}
            />
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
                  onClick={() => openFileInput("banner")}
                ></div>
              ) : (
                <div
                  className='h-20 bg-gray-400'
                  onClick={() => openFileInput("banner")}
                ></div>
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
                    onClick={() => openFileInput("image")}
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

import React from "react";
import { Post } from "../types";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import { useAuthState } from "../context/auth";
import { useRouter } from "next/router";
import axios from "axios";

interface PostCardProps {
  post: Post;
  subMutate?: () => void;
  mutate?: () => void;
}
export const PostCard = ({
  post: {
    identifier,
    slug,
    title,
    body,
    subName,
    createdAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
    sub,
  },
  mutate,
  subMutate,
}: PostCardProps) => {
  const { authenticated } = useAuthState();
  const router = useRouter();
  const isInSubPage = router.pathname === "/r/[sub]";
  const vote = async (value: number) => {
    if (!authenticated) router.push("/login");

    if (value === userVote) value = 0;

    try {
      await axios.post("/votes", { identifier, slug, value });
      if (mutate) mutate();
      if (subMutate) subMutate();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex mb-4 bg-white rounded' id={identifier}>
      {/* 좋아요 / 싫어요 기능 부분 */}
      <div className='flex-shrink-0 w-10 py-2 text-center rounded-l'>
        {/* like */}
        <div
          className='flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'
          onClick={() => vote(1)}
        >
          {userVote === 1 ? (
            <FaArrowUp className='mx-auto text-red-500' />
          ) : (
            <FaArrowUp />
          )}
        </div>
        <p className='text-xs font-bold'>{voteScore}</p>
        {/* dislike */}
        <div
          className='flex justify-center w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-500'
          onClick={() => vote(-1)}
        >
          {userVote === -1 ? (
            <FaArrowDown className='mx-auto text-blue-500' />
          ) : (
            <FaArrowDown />
          )}
        </div>
      </div>
      {/* post data */}
      <div className='w-full p-2'>
        <div className='flex items-center'>
          {!isInSubPage && (
            <>
              <Link href={`/r/${subName}`}>
                <Image
                  src={sub!.imageUrl}
                  width={24}
                  height={24}
                  alt='sub'
                  className='w-6 h-6 mr-1 rounded-full cursor-pointer'
                />
              </Link>
              <Link
                href={`/r/${subName}`}
                className='ml-2 text-xs font-bold cursor-pointer hover:underline'
              >
                /r/{subName}
              </Link>
              <span className='mx-1 text-xs text-gray-400'>•</span>
            </>
          )}

          <p className='text-xs text-gray-400'>
            Posted by
            <Link href={`/r/${username}`} className='mx-1 hover:underline'>
              /u/{username}
            </Link>
            <Link href={url} className='mx-1 hover:underline'>
              {dayjs(createdAt).format("YYYY-MM-DD HH:mm")}
            </Link>
          </p>
        </div>
        <Link href={url} className='my-1 text-lg font-medium'>
          {title}
        </Link>
        {body && <p className='my-1 text-sm'>{body}</p>}
        <div className='flex'>
          <Link href={url}>
            <i className='mr-1 fas fa-comment-alt fa-xs'></i>
            <span>{commentCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

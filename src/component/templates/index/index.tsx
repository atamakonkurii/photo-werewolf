import Image from "next/image";
import type { VFC } from "react";

import { CreateRoomButton } from "@/component/molecules/Button/CreateRoomButton";

export const Index: VFC = () => {
  return (
    <div className="container flex flex-col items-center py-8 px-5 mx-auto md:flex-row">
      <div className="mb-10 w-5/6 md:mb-0 md:w-1/2 lg:w-full lg:max-w-lg">
        <Image
          src="/images/top_view_image.png"
          alt="logo"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col items-center text-center md:items-start md:pl-16 md:w-1/2 md:text-left lg:grow lg:pl-24">
        <h1 className="mb-4 font-mono text-3xl font-medium text-slate-50 sm:text-4xl">
          スマホの写真で
          <br className="hidden lg:inline-block" />
          <p className="font-bold">騙し合い😈</p>
        </h1>
        <p className="mb-8 leading-relaxed text-slate-200">
          とても楽しそう。とても楽しそう。とても楽しそう。とても楽しそう。とても楽しそう。とても楽しそう。とても楽しそう。とても楽しそう。とても楽しそう。
        </p>
        <div className="flex justify-center">
          <CreateRoomButton url="/room/new" />
        </div>
      </div>
    </div>
  );
};

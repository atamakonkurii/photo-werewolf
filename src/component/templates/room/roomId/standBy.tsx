/* eslint-disable react/destructuring-assignment */
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";
import { CopyLinkButton } from "@/component/molecules/Button/CopyLinkButton";
import { LinkButton } from "@/component/molecules/Button/LinkButton";
import { Guests } from "@/component/organisms/Guests";

type Props = {
  user: User | null;
  roomName: string;
  hasButton: boolean;
  roomUsers: any[] | null;
};

export const StandBy: VFC<Props> = (props) => {
  const router = useRouter();
  const gamePath = router.asPath;

  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title={props.roomName} />
      {props.hasButton && (
        <CopyLinkButton
          url={`${process.env.NEXT_PUBLIC_DOMAIN}${gamePath}/guests/new`}
        />
      )}

      <div className="mt-8" />
      {props.roomUsers ? (
        <Guests users={props.roomUsers} />
      ) : (
        <div>ひとりもいません</div>
      )}
      <div className="mt-8" />

      {props.hasButton ? (
        <LinkButton url={gamePath} text="ゲームを始める" />
      ) : (
        <div className="text-white">ホストの操作待機中</div>
      )}
    </div>
  );
};

import { useRouter } from "next/router";
import type { VFC } from "react";

import { Title } from "@/component/atoms/Title";
import { CopyLinkButton } from "@/component/molecules/Button/CopyLinkButton";
import { LinkButton } from "@/component/molecules/Button/LinkButton";
import { Guests } from "@/component/organisms/Guests";

export const StandByGame: VFC = () => {
  const router = useRouter();
  const gamePath = router.asPath;
  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title="ゲーム開始まで待機中" />
      <CopyLinkButton
        url={`${process.env.NEXT_PUBLIC_DOMAIN}${router.asPath}/guests/new`}
      />
      <div className="mt-8" />
      <Guests />
      <div className="mt-8" />
      <LinkButton url={gamePath} text="ゲームを始める" />
    </div>
  );
};

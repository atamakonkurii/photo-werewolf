import { Button } from "@mantine/core";
import Link from "next/link";

type Props = {
  url: string;
};

export const CreateRoomButton = (props: Props) => {
  const { url } = props;
  return (
    <Link href={url}>
      <a>
        <Button color="violet" radius="md" size="lg">
          部屋をつくる
        </Button>
      </a>
    </Link>
  );
};

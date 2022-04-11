import { Button } from "@mantine/core";
import Link from "next/link";

type Props = {
  url: string;
};

export const CreateRoomButton = (props: Props) => {
  return (
    // eslint-disable-next-line react/destructuring-assignment
    <Link href={props.url}>
      <a>
        <Button color="violet" radius="md" size="lg">
          部屋をつくる
        </Button>
      </a>
    </Link>
  );
};

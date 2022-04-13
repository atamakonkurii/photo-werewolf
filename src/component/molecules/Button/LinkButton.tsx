import { Button } from "@mantine/core";
import Link from "next/link";

type Props = {
  url: string;
  text: string;
};

export const LinkButton = (props: Props) => {
  const { text, url } = props;
  return (
    <Link href={url}>
      <a>
        <Button color="violet" radius="md" size="lg">
          {text}
        </Button>
      </a>
    </Link>
  );
};

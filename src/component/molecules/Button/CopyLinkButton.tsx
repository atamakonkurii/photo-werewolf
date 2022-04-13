import { Button } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";

type Props = {
  url: string;
};

export const CopyLinkButton = (props: Props) => {
  const clipboard = useClipboard({ timeout: 800 });
  const { url } = props;
  return (
    <Button
      color={clipboard.copied ? "teal" : "blue"}
      onClick={() => {
        return clipboard.copy(url);
      }}
    >
      {clipboard.copied ? "コピーしました" : "招待URL"}
    </Button>
  );
};

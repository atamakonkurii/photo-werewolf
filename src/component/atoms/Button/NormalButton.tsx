import { Button } from "@mantine/core";

type Props = { children: string };

export const NormalButton = (props: Props) => {
  // eslint-disable-next-line react/destructuring-assignment
  return <Button> {props.children}</Button>;
};

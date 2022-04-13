type Props = {
  title: string;
};

export const Title = (props: Props) => {
  const { title } = props;
  return <h1 className="pb-6 text-5xl text-white">{title}</h1>;
};

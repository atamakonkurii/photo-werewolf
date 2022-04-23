type Props = {
  title: string;
};

export const Title = (props: Props) => {
  const { title } = props;
  return <h1 className="pb-6 text-3xl text-white md:text-5xl">{title}</h1>;
};

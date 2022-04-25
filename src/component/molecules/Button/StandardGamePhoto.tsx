type Props = {
  user_name: string;
  exchanged_photo_url: string;
};

export const StandardGamePhoto = (props: Props) => {
  const { exchanged_photo_url, user_name } = props;
  return (
    <div className="mb-8">
      <img src={exchanged_photo_url} />
      <div className="text-2xl text-center text-white">{user_name}</div>
    </div>
  );
};

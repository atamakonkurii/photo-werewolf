type Props = {
  user_name: string;
  exchanged_photo_url: string;
};

export const StandardGamePhoto = (props: Props) => {
  const { exchanged_photo_url, user_name } = props;
  return (
    <div className="p-4 sm:w-1/2 lg:w-1/3">
      <div className="flex relative">
        <img
          alt="gallery"
          className="object-cover object-center absolute inset-0 w-full h-full"
          src={exchanged_photo_url}
        />
        <div className="relative z-10 py-10 px-8 w-full bg-white border-4 border-gray-200 opacity-0 hover:opacity-100">
          <h1 className="mb-3 text-3xl font-medium text-gray-900">
            {user_name}
          </h1>
        </div>
      </div>
    </div>
  );
};

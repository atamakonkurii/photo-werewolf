import { StandardGamePhoto } from "@/component/molecules/Button/StandardGamePhoto";
import { useFetchExchangedPhotoUrl } from "@/hooks/useFetchExchangedPhotoUrl";

export const StandardGamePhotoGallery = () => {
  const exchangedPhotoUrl = useFetchExchangedPhotoUrl();
  return (
    <div>
      {exchangedPhotoUrl ? (
        exchangedPhotoUrl.map((photo: any) => {
          return (
            <div key={Math.random()} className="flex flex-wrap -m-4">
              <StandardGamePhoto
                key={Math.random()}
                user_name={photo.user_name}
                exchanged_photo_url={photo.exchanged_photo_url}
              />
            </div>
          );
        })
      ) : (
        <div className="text-white">お待ちください</div>
      )}
    </div>
  );
};

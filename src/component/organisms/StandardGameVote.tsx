import { StandardGameVoteClick } from "@/component/molecules/Button/StandardGameVoteClick";
import { useFetchExchangedPhotoUrl } from "@/hooks/useFetchExchangedPhotoUrl";

export const StandardGameVote = () => {
  const exchangedPhotoUrl = useFetchExchangedPhotoUrl();
  return (
    <div>
      {exchangedPhotoUrl ? (
        exchangedPhotoUrl.map((photo: any) => {
          return (
            <StandardGameVoteClick
              key={Math.random()}
              user_name={photo.user_name}
              votedUserId={photo.user_id}
              exchanged_photo_url={photo.exchanged_photo_url}
            />
          );
        })
      ) : (
        <div className="text-white">お待ちください</div>
      )}
    </div>
  );
};

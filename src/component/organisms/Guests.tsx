/* eslint-disable react/destructuring-assignment */
import { Guest } from "@/component/molecules/Button/Guest";

type Props = {
  users: any[];
};

export const Guests = (props: Props) => {
  return (
    <div className="flex flex-col py-4 mx-auto  max-w-lg bg-white rounded-xl shadow-xl">
      {props ? (
        props.users.map((item: { users: { name: string } }) => {
          return <Guest key={item.users.name} name={item.users.name} />;
        })
      ) : (
        <div className="text-white">ひとりもいません</div>
      )}
    </div>
  );
};

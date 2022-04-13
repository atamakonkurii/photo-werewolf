import { Guest } from "@/component/molecules/Button/Guest";

export const Guests = () => {
  return (
    <div className="flex flex-col py-4 mx-auto  max-w-lg bg-white rounded-xl shadow-xl">
      <Guest />
      <Guest />
    </div>
  );
};

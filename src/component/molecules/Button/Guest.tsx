/* eslint-disable @next/next/no-html-link-for-pages */
export const Guest = () => {
  return (
    <div className="flex flex-col justify-between items-center p-4 hover:bg-[#f6f8f9]  duration-300 cursor-pointer sm:flex-row sm:py-4 sm:px-8">
      <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
        <div className="mb-2.5 sm:mr-2.5 sm:mb-0">
          <img
            className="w-20 h-20 rounded-full"
            src="https://randomuser.me/api/portraits/men/63.jpg"
          />
        </div>
        <div className="flex flex-col mb-4 sm:mr-4 sm:mb-0">
          <a href="/" className="font-medium no-underline">
            Julian Jill Brown
          </a>
        </div>
      </div>
    </div>
  );
};

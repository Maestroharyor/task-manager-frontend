const PageError = () => {
  const reloadPage = () => {
    window.location.reload();
  };
  return (
    <section className=" min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-[700px] mx-auto">
        <div className="flex flex-col items-center gap-10">
          <div className="text-center w-full">
            <div
              className="h-72 bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage:
                  "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
              }}
            ></div>
          </div>
          <div className="contant_box_404 text-center space-y-3">
            <h1 className="text-4xl font-bold  text-center text-red-500 ">
              Looks like an error occured or you are currently offline
            </h1>
            <p className="mt-4 text-gray-500">
              Click on the button below to reload page.
            </p>
            <button
              onClick={reloadPage}
              className="px-5 text-white text-base py-2 bg-red-500  hover:bg-red-600  rounded transition-all duration-300 ease-in-out"
            >
              Reload Page Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageError;

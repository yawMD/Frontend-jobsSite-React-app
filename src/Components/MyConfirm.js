function MyConfirmModal(props) {
  const handleConfirm = () => {
    props.confirm()
    props.close()
  };
  return (
    <div
      className={`${
        props.show
          ? "h-screen w-full fixed flex flex-wrap content-center bg-black bg-opacity-80 visible z-50 left-0 top-0"
          : "invisible hidden"
      } `}
    >
      <div className="container m-auto w-1/2 bg-white rounded shadow p-2">
        <h1 className="font-semibold text-lg pt-4 pl-2 text-red-500">{props.title}</h1>
        <div className="py-6 clear-both">
          <hr />
          <p className="p-2 w-full text-gray-700">{props.message}</p>
        </div>
        <div className="text-right">
          <button
            onClick={() => {
              props.close()
            }}
            className={`px-4 pb-1 border-b-2 border-red-200 mr-2 mt-auto text-red-600 `}
          >
            <h2 className="inline-block">Cancel</h2>
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 mx-2 rounded shadow-lg hover:bg-blue-900 bg-blue-600 text-white `}
          >
            <h2 className="inline-block">Confirm</h2>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyConfirmModal;

export default function Login({ handleLogin, handleLoginChange }) {
  return (
    <div className='min-h-screen bg-green-300 flex flex-col justify-center items-center'>
      <div className='bg-white p-5 rounded-md shadow-md'>
        <div className=''>
          <h1 className='text-6xl font-serif text-center'>
            Chattr <span className='-ml-4 text-blue-700'>.</span>
          </h1>
          <p className='text-2xl text-center'>your chats, your way</p>
        </div>

        <form onSubmit={handleLogin} className='flex flex-col mt-5'>
          <p className='text-lg'>Enter your name to start:</p>
          <div className='flex '>
            <input
              type='text'
              onChange={handleLoginChange}
              className='bg-gray-100 p-3 rounded-tl-md rounded-bl-md  focus:outline-none border-t border-l border-b'
              placeholder='your name'
            />
            <button
              type='submit'
              className='font-semibold px-2 bg-gray-100 hover:text-white hover:bg-blue-700 transition-all ease-in-out duration-300 rounded-tr-md rounded-br-md border-t border-r border-b'
            >
              Sign in to get started
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

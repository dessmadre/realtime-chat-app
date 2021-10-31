import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import Image from 'next/image';

const Chat = ({ sender }) => {
  const [chats, setChats] = useState([]);
  const [messageToSend, setMessageToSend] = useState('');

  const letter = sender.charAt(0);
  const profilePic = `https://avatars.dicebear.com/api/initials/${letter}.svg`;
  console.log(letter);

  useEffect(() => {
    const pusher = new Pusher('141e4c871443e0aaf5cb', {
      cluster: 'us2',
    });

    const channel = pusher.subscribe('chat');

    channel.bind('chat-event', function (data) {
      setChats((prevState) => [
        ...prevState,
        { sender: data.sender, message: data.message },
      ]);
    });

    return () => {
      pusher.unsubscribe('chat');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/pusher', { message: messageToSend, sender });
    setMessageToSend('');
  };

  return (
    <main className='min-h-screen bg-green-300 flex justify-center items-center'>
      <div className='w-1/2 bg-white flex flex-col py-10 rounded-md'>
        <div className='flex justify-center'>
          <Image
            src={profilePic}
            className='rounded-full'
            width={75}
            height={75}
          />
        </div>
        <div className='my-5 max-h-96 overflow-y-scroll'>
          {chats.map((chat, id) => {
            console.log(chat);
            console.log(sender === chat.sender);
            return (
              <div
                className={`flex ${
                  sender === chat.sender ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={` mx-2 flex items-center ${
                    sender === chat.sender ? 'bg-green-500 ' : ' bg-blue-400 '
                  } rounded hover p-3 max-w-max mb-2`}
                >
                  <Image
                    src={
                      chat.sender === sender
                        ? profilePic
                        : `https://avatars.dicebear.com/api/initials/${chat.sender.charAt(
                            0
                          )}.svg`
                    }
                    className='rounded-full'
                    width={20}
                    height={20}
                  />
                  <p className='ml-3 text-3xl'>{chat.message}</p>
                </div>
              </div>
            );
          })}
        </div>

        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className='flex justify-center'
        >
          <input
            type='text'
            value={messageToSend}
            className='bg-gray-100 p-3 rounded-tl-md rounded-bl-md  focus:outline-none border-t border-l border-b'
            onChange={(e) => setMessageToSend(e.target.value)}
            placeholder='start typing....'
          />
          <button
            type='submit'
            className='font-semibold px-2 bg-gray-100 hover:text-white hover:bg-blue-700 transition-all ease-in-out duration-300 rounded-tr-md rounded-br-md border-t border-r border-b'
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
};

export default Chat;

import Pusher from 'pusher';

export const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_APP_ID,
  key: process.env.NEXT_PUBLIC_KEY,
  secret: process.env.NEXT_PUBLIC_SECRET,
  cluster: process.env.NEXT_PUBLIC_CLUSTER,
  useTLS: true,
});

export default async function handler(req, res) {
  const { message, sender } = req.body;

  await pusher.trigger('chat', 'chat-event', {
    message,
    sender,
  });

  console.log(process.env.NEXT_PUBLIC_APP_ID);
  console.log(process.env.NEXT_PUBLIC_KEY);
  console.log(process.env.NEXT_SECRET);

  res.json({ message: 'completed' });
}

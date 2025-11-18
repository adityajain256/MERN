import Chat from '@/components/Chat';
import Link from 'next/link';

export default async function Home() {
  const user = await fetch('http://localhost:8090/api/users');
  const userData = await user.json();
  return (
    <main className=''>
      {/* <Chat /> */}
      {
        userData.map((user) => {
          return (
            <Link href={`/user/${user._id}`} key={user._id} className='text-blue-500 underline'>
          <div key={user._id} className='border border-gray-700 p-4 my-4 rounded-md bg-gray-800'>
            <h3 className='text-white font-semibold'>{user.userName}</h3>
            <p className='text-gray-500 '>Number: {user.number}</p>
          </div>
          </Link>
          )
        })
      }
    </main>
  )
}

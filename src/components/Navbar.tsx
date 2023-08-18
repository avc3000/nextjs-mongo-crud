import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='bg-gray-950 py-5 mb-2'>
      <div className='container flex justify-between px-10 md:px-0 mx-auto'>
        <Link href="/">
          <h1 className='text-2xl font-bold text-orange-500 hover:text-orange-300'>Next Mongo</h1>
        </Link>
        <h1 className='font-bold text-3xl text-yellow-500'>CRUD TASKS</h1>
        <ul className='flex gap-x-4'>
          <li className='bg-green-600 p-1 rounded-lg px-2 font-bold hover:bg-green-500 hover:text-black'>
            <Link href="/tasks/new">CREATE</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;
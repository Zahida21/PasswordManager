import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-teal-950 text-white'>
    <div className="mycontainer flex justify-between items-center py-5 px-4 h-14">
        <div className="logo font-bold text-white text-2xl">
            <span className='text-coral-500'>&lt;</span>
            <span>Pass</span>
            <span className='text-coral-500'>Mang/&gt;</span>
        </div>
        {/* <ul>
            <li className='flex gap-4'>
                <a className='hover:font-bold ' href="#">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul> */}
        <div>
            <button className='text-white bg-teal-800  my-5 rounded-full flex justify-between items-center ring-white ring-1 '>

            <img className=' invert p-1 w-10' src="icons/github.svg" alt="github logo" />
           <span className='font-bold px-2'>Github</span> 
            </button>
        </div>
    </div>
</nav>




  )
}

export default Navbar

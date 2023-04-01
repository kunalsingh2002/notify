import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
        <ul style={{'list-style': 'none'}} className ='flex space-x-10 justify-center font-bold text-black'>
            <Link href={'/previousnotices'} style = {{'textDecoration': 'none', 'color' : 'black'}}><li>
                Previous Notices
            </li></Link>
            <Link href={'/login'} style = {{'textDecoration': 'none', 'color' : 'black'}}><li>
                Logout
            </li></Link>
        </ul>
    </div>
  )
}

export default Navbar
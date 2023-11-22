import React from 'react'
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsPeopleFill } from 'react-icons/bs'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3 className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="#prueba">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>

            <li className='sidebar-list-item'>
                <a href="#prueba">
                    <BsFillArchiveFill className='icon'/> Events
                </a>
            </li>

            <li className='sidebar-list-item'>
                <a href="#prueba">
                    <BsFillGrid3X3GapFill className='icon'/> Categories
                </a>
            </li>

            <li className='sidebar-list-item'>
                <a href="#prueba">
                    <BsPeopleFill className='icon'/> Users
                </a>
            </li>

            <li className='sidebar-list-item'>
                <a href="#prueba">
                    <BsListCheck className='icon'/> Inventory
                </a>
            </li>

            <li className='sidebar-list-item'>
                <a href="#prueba">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>

            <li className='sidebar-list-item'>
                <a href="#prueba">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar
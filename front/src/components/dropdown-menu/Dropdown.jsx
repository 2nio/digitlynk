import React, { useRef, useEffect, useState } from 'react'
import './Dropdown.css'

function Dropdown({ displayMenu, parentState, menuOptions }) {

    const dropmenuRef = useRef()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!dropmenuRef.current.contains(e.target)) {
                parentState(false)
            }
        }
        if (displayMenu) document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [displayMenu])

    return (
        <div ref={dropmenuRef} className='Dropdown_div' style={{ display: displayMenu && 'flex' }}>
            <ul>
                {menuOptions.map(item =>
                    <li key={item.option} onClick={e => item.func()}>{item.option}</li>
                )}
            </ul>
        </div>
    )
}

export default Dropdown
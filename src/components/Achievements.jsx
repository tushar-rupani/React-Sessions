import React from 'react'
import '../index.css'
export const Achievements = ({id, onRemove}) => {
    id = !id ? 0 : id;
  return (
    <div className='achievements flex'>
        <input type="text" name={`title${id}`} className={`title${id} m`} placeholder='Enter Title' /><br />
        <input type="text" name={`year${id}`} className={`year${id} m`} placeholder='Enter Achievement Year'/><br />
    </div>
  )
}

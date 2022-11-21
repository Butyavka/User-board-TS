import './style.scss'
import React, {FC, useState} from 'react'
import {User} from '../../types/types'
import block from 'bem-cn-lite'

const b = block('user-card')

const UserItem: FC<User> = ({
  avatar_url,
  login,
  id,
  html_url,
  draggable,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  isFavorite,
  canDelete
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={ b() }
      draggable={ draggable }
      onDragStart={ () => onDragStart && onDragStart() }
      onDragOver={ (e) => onDragOver && onDragOver(e) }
      onDragLeave={ (e) => onDragLeave && onDragLeave(e) }
      onDrop={ (e) => onDrop && onDrop(e) } 
    >
      <div
        className={ b('header') }
      >
        <div className={ b('name-box') }>
          <div className={ b('id') }>ID: {id}</div>
          <div className={ b('name') }>
            {login}
          </div>
        </div>
        <div className={ b('buttons') }>
          {canDelete && <button className={ b('button', { delete: true }) }/>}
          {isFavorite && <div className={ b('button', { favorite: true }) }/>}
          <button onClick={ () => setOpen(!open) } className={ b('button', { visibility: !open, invisibility: open }) }/>
        </div>
      </div>
      <div className={ b('card', { open }) }>
        <div className={ b('top') }>
          <div className={ b('avatar') }>
            <img className={ b('img') } src={ avatar_url } alt={ login }/>
          </div>
        </div>
        <div className={ b('bottom') }>
          <div className={ b('link-box') } >
                        Link to user:
            <a className={ b('link') }  href={ html_url } title={ html_url }>
              {html_url}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserItem
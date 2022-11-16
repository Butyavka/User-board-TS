import './style.scss'
import React, {FC, useState} from 'react';
import {IUser} from "../../types/types";
import block from 'bem-cn-lite';
import Visibility from "../icons/Visibility";
import Icon from "../Icon";
import VisibilityOff from "../icons/VisibilityOff";

const b = block('user_card');

const UserItem: FC<IUser> = ({ avatar_url, login, id, html_url, draggable }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={ b() } draggable={ draggable }>
            <div
                className={ b('header') }
                onClick={ () => setOpen(!open) }
            >
                <div className={ b('name-box') }>
                    <div className={ b('id') }>ID: {id}</div>
                    <div className={ b('name') }>
                        {login}
                    </div>
                </div>
                <Icon icon={ open ? <VisibilityOff/> : <Visibility/> } className={ b('icon') }/>
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
    );
};

export default UserItem
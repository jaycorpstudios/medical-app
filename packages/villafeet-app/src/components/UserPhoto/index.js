import React from 'react';
import './UserPhoto.scss';
const UserPhoto = (props) => {
    const { className='', src, name='?', gender='male', ...other } = props;
    const classes = `UserPhoto ${className}`
    if(src){
        return <img className={classes} src={src} alt={name} {...other}/>
    }else {
        const [initial] = name.split('');
        return <figure className={`${classes} ${gender}`} {...other}><figcaption>{initial}</figcaption></figure>
    }

}

export default UserPhoto;


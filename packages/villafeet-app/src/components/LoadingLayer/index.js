import React from 'react';
import LoadingState from './../LoadingState';
import './LoadingLayer.scss';

export default props => {
    return (
        <div className="LoadingLayer"><LoadingState /></div>
    )
}
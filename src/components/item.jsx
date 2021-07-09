import React from 'react'
import '../styles/item.scss'
import {domain} from '../service'


export function Item(props) {
    return (
        <article className="list__item">
            <div>
                <img src={`${domain}${props.item.imgPath}`} alt={props.item.title}/>
                <button onClick={props.onClick}>+</button>
            </div>
            <p className="list__item__price">${props.item.price.toFixed(2)}</p>
            <h3>{props.item.title}</h3>
            <p className="list__item__description">{props.item.description}</p>
        </article>
    );
}

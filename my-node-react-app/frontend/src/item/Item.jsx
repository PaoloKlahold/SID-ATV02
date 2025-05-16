import React, { useState } from 'react';
import './Item.css';

const Item = ({ item }) => {
    const [price, setPrice] = useState('');

    const handleSendName = async () => {
        try {
            let backendUrl;
            const { hostname, href } = window.location;
            if (hostname.endsWith('.github.dev')) {
                backendUrl = href.replace(/-\d+\.app\.github\.dev/, '-5000.app.github.dev').replace(/(https?:\/\/[^/]+).*/, '$1');
            } else {
                backendUrl = 'http://localhost:5000';
            }
            const response = await fetch(`${backendUrl}/api/item`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: item.name }),
            });
            const data = await response.json();
            setPrice(data.price ?? 'Indisponível');
        } catch (error) {
            setPrice('Erro');
        }
    };

    return (
        <div className="item-box">
            <h2 className="item-title">{item.name}</h2>
            <div className="item-price">
                {price === '' ? <span className="price-placeholder">Preço: --</span> : <span>Preço: R$ {price}</span>}
            </div>
            <button className="item-btn" onClick={handleSendName}>Pesquisar preço</button>
        </div>
    );
};

export default Item;
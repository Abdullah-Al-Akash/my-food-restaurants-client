import React from 'react';

const MenuCard = ({item}) => {
    const{name,recipe,image,price} = item;
    return (
        <div className='md:flex space-x-2 p-10 shadow-md rounded'>
            <img style={{borderRadius: '0 200px 200px 200px'}} className='w-[170px] mx-auto' src={image} alt="" />
            <div className='p-2'>
                <h3 className='text-3xl font-semibold'>{name}</h3>
                <p className='text-lg text-gray-500 pt-2'>{recipe}</p>
            </div>
            <p className='text-yellow-500 text-2xl font-semibold'>${price}</p>
        </div>
    );
};

export default MenuCard;
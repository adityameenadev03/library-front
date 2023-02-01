import React from 'react'

export const Price = ({salePrice,originalPrice}) => {
    return (
        <div className="book__price">
            {
                salePrice ? <><span className="book__price--normal">${originalPrice}</span> ${salePrice}</> : <>${originalPrice}</>
            }

        </div>
    )
}

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Rating = ({rating}) => {
  return (
    <div className="book__ratings">
                { new Array(4).fill(0).map((_,index)=> <FontAwesomeIcon icon="star"/>)}

                {!Number.isInteger(rating) &&   <FontAwesomeIcon icon="star-half-alt"/>}
            </div>
  )
}

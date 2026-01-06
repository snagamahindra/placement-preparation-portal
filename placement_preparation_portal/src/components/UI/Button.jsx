import React from 'react'
import '../../App.css'

export default function Button({children, onClick}){
  return <button onClick={onClick} className="ui-button">{children}</button>
}

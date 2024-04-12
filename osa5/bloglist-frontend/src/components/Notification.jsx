import React, { useEffect, useState } from 'react'

const Notification = ({ message, type, visible }) => {
    if (message === null || message === '') {
        return null
    }

  const notificationStyle = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={visible ? notificationStyle : { display: 'none' }}>
    {message}
</div>
  )
}

export default Notification
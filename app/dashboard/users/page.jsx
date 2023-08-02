"use client"
import React from 'react'

function Users() {
  return (
    <>
      <button onClick={() => console.log(JSON.parse(localStorage.getItem('session')).user.id)}>CLICK ME</button >
    </>
  )
}

export default Users
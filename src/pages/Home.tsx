import { Card } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css"

function Home() {
  return (
    <span className='center-page'>
        <Card style={{width:500}}>
            <span>Create a <Link to="/list_roles">Role Type</Link></span><br/>
            <span>Create or Update <Link to="/create_update_role">Member</Link></span>
        </Card>
    </span>
  )
}

export default Home
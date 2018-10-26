import React from 'react'
import { LoginPage, ProfilePage } from '../AppLazyLoader'
import { BrowserRouter, Route, Link } from 'react-router-dom'

export default function AppRouter (props) {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Route exact path='/' component={LoginPage} />
        <Route path='/profile' component={ProfilePage} />
      </React.Fragment>
    </BrowserRouter>
  )
}

import React, { useContext } from 'react'
import { View, Text } from 'react-native'
// Auth Routes
import AuthRoutes from './auth.routes.js'
// User Routes
import UserRoutes from './user.routes.js'

// Auth Context
import AuthContext from '../contexts/auth.js'

export default function Routes() {

    const { signed } = useContext(AuthContext);

    return signed ? <UserRoutes/> : <AuthRoutes/>
}

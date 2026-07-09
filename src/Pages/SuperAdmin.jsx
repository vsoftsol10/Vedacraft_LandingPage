import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import AdminDashboard from './AdminDashboard'
import SuperAdminLogin from '../Components/SuperAdminLogin'

const SuperAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        setChecked(true)
        return
      }

      const { data: adminRow } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', session.user.id)
        .maybeSingle()

      setIsAdmin(!!adminRow)
      setChecked(true)
    }

    checkAdmin()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAdmin(false)
  }

  if (!checked) return null

  return isAdmin ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <SuperAdminLogin onLoginSuccess={() => setIsAdmin(true)} />
  )
}

export default SuperAdmin
import React, { FC, useEffect, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Dashboard } from "./pages/Dashboard"
import { Documents } from "./pages/Documents"
import { useQuery } from "react-query"
import { validateToken } from "./api/auth"
import { Loader } from "@mantine/core"
import { userAtom } from "./atoms/user"
import { useAtom } from "jotai"
import { Convert } from "./pages/Convert"
import { Vision } from "./pages/Vision"
import { Translate } from "./pages/Translate"

interface Props {}

export const AppRoutes: FC<Props> = () => {
  const [user, setUser] = useAtom(userAtom)
  const { data, isLoading } = useQuery("validate", validateToken)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (data?.success) setUser({ isAuthorized: true })
    else setUser({ isAuthorized: false })
  }, [data])

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(isLoading), 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [isLoading])

  if (loading) return <Loader />

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={user.isAuthorized ? <Dashboard /> : <Login />}>
        <Route path="documents" element={<Documents />} />
        <Route path="convert" element={<Convert />} />
        <Route path="vision" element={<Vision />} />
        <Route path="translate" element={<Translate />} />
        <Route path="/" element={<Navigate to="/documents" replace />} />
      </Route>
    </Routes>
  )
}

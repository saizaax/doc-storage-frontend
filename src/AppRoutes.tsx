import React, { FC, useEffect, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Documents } from "./pages/Documents";
import { useQuery } from "react-query";
import { validateToken } from "./api/auth";
import { Loader } from "@mantine/core";
import { userAtom } from "./atoms/user";
import { useAtom } from "jotai";

interface Props {}

export const AppRoutes: FC<Props> = () => {
  const navigate = useNavigate()
  
  const [user, setUser] = useAtom(userAtom)

  const { data, isLoading } = useQuery("validate", validateToken)

  useEffect(() => {
    if (data?.success) {
      setUser({ isAuthorized: true })
      navigate("/documents")
    }
    else setUser({ isAuthorized: false })
  }, [data])

  if (isLoading) return <Loader />

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={user.isAuthorized ? <Dashboard /> : <Navigate to="/login" />}>
        <Route path="documents" element={<Documents />} /> 
        <Route path="/" element={<Navigate to="/documents" replace />} />
      </Route>
    </Routes>
  )
}

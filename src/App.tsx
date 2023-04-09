import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AppRoutes } from "./AppRoutes"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { Notifications } from "@mantine/notifications"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={{ fontFamily: "Inter, sans serif" }}>
        <Notifications position="top-right" />
        <div className="app">
          <Router>
            <AppRoutes />
          </Router>
        </div>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default App

import React, { FC } from "react"
import { AppShell, Button, Flex, Header, Navbar } from "@mantine/core"
import { Outlet, useNavigate } from "react-router-dom"
import { MainLinks } from "../components/MainLinks"
import { User } from "../components/User"
import { Logo } from "../components/Logo"
import { getProfile } from "../api/auth"
import { useQuery } from "react-query"
import { useAtom } from "jotai"
import { userAtom } from "../atoms/user"

export const Dashboard: FC = () => {
  const navigate = useNavigate()

  const [, setUser] = useAtom(userAtom)
  const { data } = useQuery("profile", getProfile)

  const handleLogOut = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setUser({ isAuthorized: false })
    navigate("/login")
  }

  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section grow mt="xs">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section>
            <User
              username={data?.username}
              email={data?.email}
              avatar={data?.avatar}
            />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} sx={{ width: "100%" }}>
          <Flex
            justify="space-between"
            align="center"
            px={20}
            sx={{ height: "100%" }}
          >
            <Logo colorScheme="light" />
            <Button variant="light" radius="md" mr={10} onClick={handleLogOut}>
              Выйти
            </Button>
          </Flex>
        </Header>
      }
      sx={{ width: "100vw" }}
    >
      <Outlet />
    </AppShell>
  )
}

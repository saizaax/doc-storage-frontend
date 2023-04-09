import React, { FC, useEffect } from "react"
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button
} from "@mantine/core"
import { useMutation, useQuery } from "react-query"
import { login, validateToken } from "../api/auth"
import { Link, useNavigate } from "react-router-dom"
import { userAtom } from "../atoms/user"
import { useAtom } from "jotai"

interface Props {}

export const Login: FC<Props> = () => {
  const navigate = useNavigate()

  const [user, setUser] = useAtom(userAtom)

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const { mutate, data } = useMutation(() => login({ email, password }))

  useEffect(() => {
    if (data?.accessToken && data?.refreshToken) {
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      setUser({ isAuthorized: true })
      navigate("/")
    }
  }, [data])

  useEffect(() => {
    if (user.isAuthorized) navigate("/")
  }, [user])

  return (
    <Container size={420} miw={370} my={40}>
      <Title align="center">
        <img src="/Logo.png" height={42} alt="logo" />
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Нет аккаунта?{" "}
        <Link to="/register">
          <Anchor size="sm" component="button">
            Зарегистрироваться
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" sx={{ width: "100%" }}>
        <TextInput
          label="Email"
          placeholder="me@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Пароль"
          placeholder="•••••••••••••"
          required
          mt="md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Запомнить меня" />
        </Group>
        <Button fullWidth mt="xl" radius="md" onClick={() => mutate()}>
          Войти
        </Button>
      </Paper>
    </Container>
  )
}

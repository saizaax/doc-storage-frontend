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
import { useForm } from "@mantine/form"
import { useMutation } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../api/auth"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"

interface Props {}

export const Register: FC<Props> = () => {
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },

    validate: {
      confirmPassword: (value, values) => (value !== values.password ? "Пароли не совпадают" : null)
    }
  })

  const { mutate, data } = useMutation(() =>
    register({ email: form.values.email, password: form.values.password })
  )

  useEffect(() => {
    if (data?.username) {
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "Аккаунт успешно зарегистрирован",
        message: "Теперь вы можете войти в свою учетную запись",
        color: "green",
        icon: <IconCheck />
      })
      navigate("/login")
    }
  }, [data])

  return (
    <Container size={420} miw={370} my={40}>
      <Title align="center">
        <img src="/Logo.png" height={42} alt="logo" />
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Уже есть аккаунт?{" "}
        <Link to="/login">
          <Anchor size="sm" component="button">
            Войти
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" sx={{ width: "100%" }}>
        <form onSubmit={form.onSubmit(() => mutate())}>
          <TextInput label="Email" placeholder="me@example.com" required {...form.getInputProps("email")} />
          <PasswordInput
            label="Пароль"
            placeholder="•••••••••••••"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Повторите пароль"
            placeholder="•••••••••••••"
            required
            mt="md"
            {...form.getInputProps("confirmPassword")}
          />
          <Button fullWidth mt="xl" type="submit" radius="md">
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

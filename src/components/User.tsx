import { Avatar, Box, Group, UnstyledButton, Text, useMantineTheme, rem } from "@mantine/core"
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react"
import React, { FC } from "react"

interface Props {
  username: string
  email: string
  avatar: string
}

export const User: FC<Props> = ({ username, email, avatar }) => {
  const theme = useMantineTheme()

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
        }`
      }}
    >
      <UnstyledButton
        sx={{
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
          }
        }}
      >
        <Group>
          <Avatar src={avatar} radius="xl" />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {username}
            </Text>
            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </Box>
        </Group>
      </UnstyledButton>
    </Box>
  )
}

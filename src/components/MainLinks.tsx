import React from "react"
import {
  IconTransform,
  IconFileTextAi,
  IconAlphabetLatin,
  IconFileDatabase,
  IconLanguage
} from "@tabler/icons-react"
import { ThemeIcon, UnstyledButton, Group, Text, Anchor } from "@mantine/core"
import { Link, useLocation } from "react-router-dom"

interface MainLinkProps {
  icon: React.ReactNode
  color: string
  label: string
  active: boolean
  url: string
}

function MainLink({ icon, color, label, active, url }: MainLinkProps) {
  const textStyles = {
    "@media (max-width: 768px)": {
      display: "none"
    }
  }

  return (
    <Link to={url}>
      <UnstyledButton
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
          backgroundColor: active ? theme.colors.gray[1] : "transparent",

          "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0]
          }
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>
          <Text size="sm" sx={textStyles}>
            {label}
          </Text>
        </Group>
      </UnstyledButton>
    </Link>
  )
}

const data = [
  {
    icon: <IconFileDatabase size="1rem" />,
    color: "blue",
    label: "Мои документы",
    url: "/documents"
  },
  {
    icon: <IconTransform size="1rem" />,
    color: "teal",
    label: "Конвертация файлов",
    url: "/convert"
  },
  {
    icon: <IconFileTextAi size="1rem" />,
    color: "violet",
    label: "Распознавание текста",
    url: "/vision"
  },
  {
    icon: <IconLanguage size="1rem" />,
    color: "grape",
    label: "Перевод текста",
    url: "/translate"
  }
]

export function MainLinks() {
  const location = useLocation()

  const links = data.map((link) => (
    <MainLink {...link} key={link.label} url={link.url} active={link.url === location.pathname} />
  ))
  return <div>{links}</div>
}

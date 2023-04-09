import React from 'react';
import {
  IconTransform,
  IconFileTextAi,
  IconAlphabetLatin,
  IconFileDatabase
} from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
}

function MainLink({ icon, color, label }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  { icon: <IconFileDatabase size="1rem" />, color: 'blue', label: 'Мои документы' },
  { icon: <IconTransform size="1rem" />, color: 'teal', label: 'Конвертация файлов' },
  { icon: <IconFileTextAi size="1rem" />, color: 'violet', label: 'Распознавание текста' },
  { icon: <IconAlphabetLatin size="1rem" />, color: 'grape', label: 'Перевод' },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
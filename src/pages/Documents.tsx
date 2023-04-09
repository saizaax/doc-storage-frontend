import React, { FC } from "react"
import styles from "./Documents.module.scss"
import {
  Accordion,
  Avatar,
  Button,
  Text,
  Flex,
  Group,
  Input,
  MultiSelect,
  Title,
  rem,
  Paper,
  Badge,
  Box,
  ActionIcon,
  AccordionControlProps,
  Table,
  Divider,
  Anchor
} from "@mantine/core"
import { IconDots, IconSearch, IconUpload } from "@tabler/icons-react"
import { useQuery } from "react-query"
import { getDocuments } from "../api/documents"
import { parseTime } from "../utils/parseTime"

interface Props {}

const formats = [
  { value: "docx", label: "DOCX" },
  { value: "pdf", label: "PDF" },
  { value: "jpeg", label: "JPEG" },
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" }
]

function AccordionControl(props: AccordionControlProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }} pr={20}>
      <Accordion.Control {...props} />
      <ActionIcon size="lg">
        <IconDots size="1rem" />
      </ActionIcon>
    </Box>
  )
}

const AccordionLabel: FC<any> = ({ name, updated_at }) => {
  return (
    <Group noWrap>
      <Box p="sm">
        <Badge>PDF</Badge>
      </Box>
      <div>
        <Text>{name}</Text>
        <Text size="sm" color="dimmed" weight={400}>
          {parseTime(updated_at)}
        </Text>
      </div>
    </Group>
  )
}

export const Documents: FC<Props> = () => {
  const { data } = useQuery("documents", () => getDocuments())

  const ths = (
    <tr>
      <th>Дата</th>
      <th>Название</th>
      <th>Формат</th>
      <th>Размер</th>
      <th></th>
    </tr>
  )

  const getRows = (elements: any) =>
    elements.map((element: any) => (
      <tr key={element?.id}>
        <td>{parseTime(element?.created_at)}</td>
        <td><Text fw={500}>{element?.name}</Text></td>
        <td><Badge>{element?.format}</Badge></td>
        <td>{element?.size / 1000} КБ</td>
        <td><Anchor href={element?.url}>Скачать</Anchor></td>
      </tr>
    ))

  const items = data
    ? data.map((item: any) => (
        <Accordion.Item value={item?.id} key={item?.id}>
          <AccordionControl>
            <AccordionLabel {...item} />
          </AccordionControl>
          <Accordion.Panel>
            {item?.description && <Text size="sm">{item?.description}</Text>}
            <Divider my="sm" variant="dashed" />
            <Table verticalSpacing="sm" striped>
              <thead>{ths}</thead>
              <tbody>{getRows(item?.File)}</tbody>
            </Table>
          </Accordion.Panel>
        </Accordion.Item>
      ))
    : []

  return (
    <Flex direction="column" gap={30} p={10}>
      <Flex align="center" justify="space-between">
        <Title order={2}>Мои документы</Title>
        <Button radius="md" rightIcon={<IconUpload size="1rem" />}>
          Загрузить
        </Button>
      </Flex>
      <Flex align="center" gap={20} justify="space-between">
        <MultiSelect data={formats} placeholder="Форматы файлов" radius="md" />
        <Input
          icon={<IconSearch size="1rem" />}
          placeholder="Поиск"
          radius="md"
        />
      </Flex>
      <Accordion chevronPosition="right" variant="contained" radius="md">
        {items}
      </Accordion>
    </Flex>
  )
}

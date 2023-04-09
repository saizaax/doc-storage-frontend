import React, { FC } from "react"
import styles from "./Documents.module.scss"
import {
  Accordion,
  Button,
  Text,
  Flex,
  Group,
  Input,
  MultiSelect,
  Title,
  Badge,
  Box,
  Table,
  Divider,
  Anchor
} from "@mantine/core"
import { IconSearch, IconUpload } from "@tabler/icons-react"
import { useQuery } from "react-query"
import { getDocuments } from "../api/documents"
import { parseTime } from "../utils/parseTime"
import { UploadDocumentModal } from "../components/modals/UploadDocumentModal"
import { useDisclosure } from "@mantine/hooks"
import { DocumentMenu } from "../components/menus/DocumentMenu"
import { getFiles } from "../api/files"
import { ConvertMenu } from "../components/menus/ConvertMenu"

interface Props {}

const formats = [
  { value: "docx", label: "DOCX" },
  { value: "pdf", label: "PDF" },
  { value: "jpeg", label: "JPEG" },
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" }
]

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

export const Convert: FC<Props> = () => {
  const { data } = useQuery("files", () => getFiles())

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
        <td>
          <Text fw={500}>{element?.name}</Text>
        </td>
        <td>
          <Badge>{element?.format}</Badge>
        </td>
        <td>
          <Badge color="green">{element?.size / 1000} КБ</Badge>
        </td>
        <td>
          <Flex justify="flex-end">
            <Anchor href={element?.url}>Скачать</Anchor>
          </Flex>
        </td>
      </tr>
    ))

  const items =
    data && data.length > 0
      ? data.map((item: any) => (
          <Accordion.Item value={item?.id} key={item?.id}>
            <ConvertMenu id={item?.id} url={item?.url}>
              <AccordionLabel {...item} />
            </ConvertMenu>
            <Accordion.Panel>
              <Divider my="sm" variant="dashed" />
              <Table verticalSpacing="sm" striped>
                <thead>{ths}</thead>
                <tbody>{getRows(item?.Format)}</tbody>
              </Table>
            </Accordion.Panel>
          </Accordion.Item>
        ))
      : []

  return (
    <>
      <Flex direction="column" gap={30} p={10}>
        <Flex align="center" justify="space-between">
          <Title order={2}>Конвертация файлов</Title>
        </Flex>
        <Flex align="center" gap={20} justify="space-between">
          <MultiSelect data={formats} placeholder="Форматы файлов" radius="md" />
          <Input icon={<IconSearch size="1rem" />} placeholder="Поиск" radius="md" />
        </Flex>
        <Accordion chevronPosition="right" variant="contained" radius="md">
          {items}
        </Accordion>
      </Flex>
    </>
  )
}

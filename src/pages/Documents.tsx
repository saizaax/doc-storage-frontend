import React, { FC } from "react"
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
  Anchor,
  ScrollArea,
  Sx
} from "@mantine/core"
import { IconSearch, IconUpload } from "@tabler/icons-react"
import { useQuery } from "react-query"
import { getDocuments } from "../api/documents"
import { parseTime } from "../utils/parseTime"
import { UploadDocumentModal } from "../components/modals/UploadDocumentModal"
import { useDisclosure } from "@mantine/hooks"
import { DocumentMenu } from "../components/menus/DocumentMenu"

interface Props {}

const formats = [
  { value: "docx", label: "DOCX" },
  { value: "pdf", label: "PDF" },
  { value: "jpeg", label: "JPEG" },
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" }
]

const AccordionLabel: FC<any> = ({ format, name, updated_at }) => {
  return (
    <Group>
      <Box p="sm">
        <Badge>DOC</Badge>
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
  const [opened, { open, close }] = useDisclosure(false)

  const { data } = useQuery("documents", () => getDocuments())

  const ths = (
    <tr style={{ overflowY: "scroll", maxWidth: "100%" }}>
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

  const tableHeadStyles = {
    "@media screen and (max-width: 768px)": {
      display: "none"
    }
  }

  const items =
    data && data.length > 0
      ? data.map((item: any) => (
          <Accordion.Item value={item?.id} key={item?.id}>
            <DocumentMenu id={item?.id}>
              <AccordionLabel {...item} />
            </DocumentMenu>
            <Accordion.Panel sx={{ position: "relative" }}>
              {item?.description && <Text size="sm">{item?.description}</Text>}
              <Divider my="sm" variant="dashed" />
              <ScrollArea>
                <Table verticalSpacing="sm" striped sx={{ maxWidth: "100%" }}>
                  <thead>{ths}</thead>
                  <tbody>{getRows(item?.File)}</tbody>
                </Table>
              </ScrollArea>
            </Accordion.Panel>
          </Accordion.Item>
        ))
      : []

  const titleStyles: Sx = {
    "@media screen and (max-width: 768px)": {
      flexDirection: "column",
      gap: "20px",
      alignItems: "flex-start"
    }
  }

  const filterStyles: Sx = {
    "@media screen and (max-width: 768px)": {
      flexDirection: "column",
      gap: "20px",
      alignItems: "flex-start"
    }
  }

  return (
    <>
      <Flex direction="column" gap={30} p={10}>
        <Flex align="center" justify="space-between" sx={titleStyles}>
          <Title order={2}>Мои документы</Title>
          <UploadDocumentModal opened={opened} close={close} />
          <Button radius="md" rightIcon={<IconUpload size="1rem" />} onClick={open}>
            Загрузить
          </Button>
        </Flex>
        <Flex align="center" gap={20} justify="space-between" sx={filterStyles}>
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

import React, { FC } from "react"
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Box,
  Menu
} from "@mantine/core"
import { IconCirclePlus, IconDots, IconTrash } from "@tabler/icons-react"
import { UploadFileModal } from "../modals/UploadFileModal"
import { useDisclosure } from "@mantine/hooks"
import { DeleteModal } from "../modals/DeleteModal"

interface Props extends AccordionControlProps {
  id: string
}

export const DocumentMenu: FC<Props> = (props: Props) => {
  const [openedUpload, { open: openUpload, close: closeUpload }] =
    useDisclosure(false)
  const [openedDelete, { open: openDelete, close: closeDelete }] =
    useDisclosure(false)

  return (
    <>
      <DeleteModal id={props.id} opened={openedDelete} close={closeDelete} />
      <UploadFileModal
        id={props.id}
        opened={openedUpload}
        close={closeUpload}
      />
      <Box sx={{ display: "flex", alignItems: "center" }} pr={20}>
        <Accordion.Control {...props} />
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon size="lg">
              <IconDots size="1rem" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Выберите действие</Menu.Label>
            <Menu.Item icon={<IconCirclePlus size={14} />} onClick={openUpload}>
              Добавить файл
            </Menu.Item>
            <Menu.Item
              color="red"
              icon={<IconTrash size={14} />}
              onClick={openDelete}
            >
              Удалить документ
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </>
  )
}

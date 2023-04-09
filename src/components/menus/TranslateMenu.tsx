import React, { FC } from "react"
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Anchor,
  Box,
  Menu
} from "@mantine/core"
import {
  IconCirclePlus,
  IconDots,
  IconFileDownload,
  IconLanguage,
  IconTrash
} from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { TranslateModal } from "../modals/TranslateModal"

interface Props extends AccordionControlProps {
  id: string
  url: string
}

export const TranslateMenu: FC<Props> = (props: Props) => {
  const [openedUpload, { open: openUpload, close: closeUpload }] =
    useDisclosure(false)

  return (
    <>
      <TranslateModal id={props.id} opened={openedUpload} close={closeUpload} />
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
            <Menu.Item icon={<IconFileDownload size={14} />}>
              <Anchor href={props.url} underline={false} color="#000">
                Скачать
              </Anchor>
            </Menu.Item>
            <Menu.Item icon={<IconLanguage size={14} />} onClick={openUpload}>
              Перевести текст
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </>
  )
}

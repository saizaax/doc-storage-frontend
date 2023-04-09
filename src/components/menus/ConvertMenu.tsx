import React, { FC } from "react"
import { Accordion, AccordionControlProps, ActionIcon, Anchor, Box, Menu } from "@mantine/core"
import { IconCirclePlus, IconDots, IconFileDownload, IconTransform } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { ConvertModal } from "../modals/ConvertModal"

interface Props extends AccordionControlProps {
  id: string
  url: string
}

export const ConvertMenu: FC<Props> = (props: Props) => {
  const [openedUpload, { open: openUpload, close: closeUpload }] = useDisclosure(false)

  return (
    <>
      <ConvertModal id={props.id} opened={openedUpload} close={closeUpload} />
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
            <Menu.Item icon={<IconTransform size={14} />} onClick={openUpload}>
              Конвертировать файл
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </>
  )
}

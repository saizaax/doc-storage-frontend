import React, { FC, useEffect } from "react"
import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Anchor,
  Box,
  Loader,
  Menu
} from "@mantine/core"
import {
  IconCheck,
  IconCirclePlus,
  IconDots,
  IconFileDownload,
  IconFileTextAi
} from "@tabler/icons-react"
import { useQuery, useQueryClient } from "react-query"
import { textAnalyze } from "../../api/vision"
import { notifications } from "@mantine/notifications"

interface Props extends AccordionControlProps {
  id: string
  url: string
}

export const VisionMenu: FC<Props> = (props: Props) => {
  const queryClient = useQueryClient()

  const { data, refetch, isLoading } = useQuery(
    ["analyze", props.id],
    () => textAnalyze(props.id),
    {
      enabled: false
    }
  )

  const handleVision = () => refetch()

  useEffect(() => {
    if (data?.content) {
      queryClient.invalidateQueries("files")

      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "Текст успешно распознан",
        message: "Вы можете найти его на странице «Распознавание текста»",
        color: "green",
        icon: <IconCheck />
      })

      queryClient.removeQueries("analyze")
    }
  }, [data])

  return (
    <>
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
            <Menu.Item
              icon={<IconFileTextAi size={14} />}
              onClick={handleVision}
            >
              {isLoading ? <Loader size={18} /> : "Распознать текст"}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Box>
    </>
  )
}

import { Button, Flex, Modal, Select } from "@mantine/core"
import React, { FC, useEffect, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import { convertFile } from "../../api/files"

interface Props {
  opened: boolean
  close: () => void
  id: string
}

export const ConvertModal: FC<Props> = ({ id, opened, close }) => {
  const queryClient = useQueryClient()

  const [format, setFormat] = useState<string | null>(null)

  const { mutate, isLoading, data } = useMutation(() =>
    convertFile({ format: format, fileId: id })
  )

  useEffect(() => {
    if (data) {
      queryClient.invalidateQueries("files")

      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "Файл успешно конвертирован",
        message: "Вы можете найти его на странице «Конвертация файлов»",
        color: "green",
        icon: <IconCheck />
      })

      close()
    }

    return () => {
      setFormat(null)
    }
  }, [data])

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Конвертировать файл"
      radius="md"
      centered
    >
      <Flex direction="column" justify="space-between" gap={20} mih={150}>
        <Select
          label="Выберите формат для конвертации"
          placeholder="PNG / JPEG / JPG"
          data={[
            { value: "png", label: "PNG" },
            { value: "jpeg", label: "JPEG" },
            { value: "jpg", label: "JPG" }
          ]}
          value={format}
          onChange={(value) => setFormat(value)}
          maxDropdownHeight={85}
          dropdownPosition="bottom"
        />
        <Button
          disabled={format === null}
          loading={isLoading}
          onClick={() => mutate()}
        >
          Конвертировать
        </Button>
      </Flex>
    </Modal>
  )
}

import { Button, Text, Flex, Modal } from "@mantine/core"
import React, { FC, useEffect } from "react"
import { useMutation, useQueryClient } from "react-query"
import { deleteDocument } from "../../api/documents"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"

interface Props {
  opened: boolean
  close: () => void
  id: string
}

export const DeleteModal: FC<Props> = ({ id, opened, close }) => {
  const queryClient = useQueryClient()

  const { mutate, isLoading, data } = useMutation(() => deleteDocument(id))

  useEffect(() => {
    if (data) {
      queryClient.invalidateQueries("documents")

      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "Документ успешно удален",
        message: "",
        color: "green",
        icon: <IconCheck />
      })

      close()
    }
  }, [data])

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={<Text weight={600}>Подтвердите действие</Text>}
      radius="md"
      centered
    >
      <Flex direction="column" gap={20}>
        <Button loading={isLoading} onClick={() => mutate()} color="red">
          Удалить
        </Button>
      </Flex>
    </Modal>
  )
}

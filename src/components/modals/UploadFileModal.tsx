import { Button, FileInput, Flex, Modal, TextInput, Textarea } from "@mantine/core"
import React, { FC, useEffect, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { addFile } from "../../api/documents"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"

interface Props {
  opened: boolean
  close: () => void
  id: string
}

export const UploadFileModal: FC<Props> = ({ id, opened, close }) => {
  const queryClient = useQueryClient()

  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const { mutate, isLoading, data } = useMutation(() => addFile({ documentId: id, file, name, description }))

  const isDisabled = !name || !file

  useEffect(() => {
    if (data) {
      queryClient.invalidateQueries("documents")

      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "Файл успешно добавлен",
        message: "Вы можете найти его на странице документа",
        color: "green",
        icon: <IconCheck />
      })

      close()
    }

    return () => {
      setName("")
      setDescription("")
      setFile(null)
    }
  }, [data])

  return (
    <Modal opened={opened} onClose={close} title="Добавить новый файл" radius="md" centered>
      <Flex direction="column" gap={20}>
        <TextInput
          label="Название"
          placeholder="Название файла"
          withAsterisk
          radius="md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          placeholder="Описание"
          label="Описание файла"
          radius="md"
          minRows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FileInput
          value={file}
          onChange={setFile}
          placeholder="Файл в формате PDF, DOCX, PNG или JPG/JPEG"
          label="Файл"
          withAsterisk
          accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
          radius="md"
        />
        <Button disabled={isDisabled} loading={isLoading} onClick={() => mutate()}>
          Загрузить
        </Button>
      </Flex>
    </Modal>
  )
}

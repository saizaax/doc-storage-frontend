import { Button, FileInput, Flex, Modal, TextInput, Textarea } from "@mantine/core"
import React, { FC, useEffect, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { addDocument } from "../../api/documents"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"

interface Props {
  opened: boolean
  close: () => void
}

export const UploadDocumentModal: FC<Props> = ({ opened, close }) => {
  const queryClient = useQueryClient()

  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const { mutate, isLoading, data } = useMutation(() => addDocument({ file, name, description }))

  const isDisabled = !name || !file

  useEffect(() => {
    if (data) {
      queryClient.invalidateQueries("documents")

      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "Документ успешно загружен",
        message: "Вы можете найти его на странице «Мои документы»",
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
    <Modal opened={opened} onClose={close} title="Загрузить новый документ" radius="md" centered>
      <Flex direction="column" gap={20}>
        <TextInput
          label="Название документа"
          placeholder="Документ"
          withAsterisk
          radius="md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          placeholder="Описание"
          label="Описание документа"
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

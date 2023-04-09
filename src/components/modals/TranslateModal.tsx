import { Button, Flex, Modal, Select } from "@mantine/core"
import React, { FC, useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import { translateText } from "../../api/translate"
import { textAnalyze } from "../../api/vision"

interface Props {
  opened: boolean
  close: () => void
  id: string
}

export const TranslateModal: FC<Props> = ({ id, opened, close }) => {
  const queryClient = useQueryClient()

  const [language, setLanguage] = useState<string | null>(null)

  const {
    data: analyzeData,
    refetch,
    isLoading: analyzeLoading
  } = useQuery(["analyze", id], () => textAnalyze(id), {
    enabled: false
  })

  const { mutate, isLoading, data } = useMutation((textId: string) =>
    translateText({ language: language, textId: textId })
  )

  useEffect(() => {
    if (analyzeData?.id && language) mutate(analyzeData?.id)
  }, [analyzeData])

  useEffect(() => {
    if (data) {
      queryClient.invalidateQueries("files")

      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "Текст успешно переведен",
        message: "Вы можете найти его на странице «Перевод текста»",
        color: "green",
        icon: <IconCheck />
      })

      close()
    }

    return () => {
      setLanguage(null)
    }
  }, [data])

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Перевод текста"
      radius="md"
      centered
    >
      <Flex direction="column" justify="space-between" gap={20} mih={150}>
        <Select
          label="Выберите язык для перевода"
          placeholder="EN / RU / ES / FR / DE"
          data={[
            { value: "en", label: "English" },
            { value: "ru", label: "Russian" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" },
            { value: "de", label: "German" }
          ]}
          value={language}
          onChange={(value) => setLanguage(value)}
          maxDropdownHeight={85}
          dropdownPosition="bottom"
        />
        <Button
          disabled={language === null}
          loading={isLoading || analyzeLoading}
          onClick={() => refetch()}
        >
          Перевести
        </Button>
      </Flex>
    </Modal>
  )
}

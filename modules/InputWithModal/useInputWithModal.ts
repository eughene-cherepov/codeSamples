import { useCallback, useState } from "react"
import { IData } from "@models/home"
import { useFocusEffect } from "@react-navigation/native"

interface IProps<T> {
  onChange: (options: T[]) => void
  singleSelect: boolean
  selectedItems: T[]
  reset: () => void
}

export const useInputWithModal = <T extends IData>({
  onChange,
  singleSelect,
  selectedItems,
  reset,
}: IProps<T>) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<T[]>([])

  useFocusEffect(
    useCallback(() => {
      setSelectedOptions(selectedItems)

      return () => {
        setSelectedOptions([])
      }
    }, [selectedItems])
  )

  const closeModal = () => {
    reset()
    setModalVisible(false)
  }

  const openModal = () => {
    setModalVisible(true)
  }

  const handleConfirm = () => {
    onChange(selectedOptions)
    closeModal()
  }

  const toggleOption = (option: T) => {
    const index = selectedOptions.findIndex((opt) => opt.id === option.id)
    const newSelectedOptions = [...selectedOptions]

    if (singleSelect) {
      setSelectedOptions(index === -1 ? [option] : [])
    } else {
      if (index === -1) {
        newSelectedOptions.push(option)
      } else {
        newSelectedOptions.splice(index, 1)
      }
      setSelectedOptions(newSelectedOptions)
    }
  }

  const onSelect = (option: T) => {
    toggleOption(option)
  }

  return {
    modalVisible,
    closeModal,
    openModal,
    handleConfirm,
    onSelect,
    selectedOptions,
  }
}

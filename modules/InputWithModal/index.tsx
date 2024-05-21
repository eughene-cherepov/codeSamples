import { Pressable, Text, View } from "react-native"
import { Icon, TagsCloud } from "@components"
import { InputModal } from "@modals"
import { IData } from "@models/home"
import { colors } from "@utils/constants"

import { useInputWithModal } from "./useInputWithModal"
import { useStyles } from "./styles"

interface IProps<T extends IData> {
  label: string
  modalTitle: string
  placeholder: string
  data: T[]
  selectedItems?: T[]
  loadMore: () => void
  loading: boolean
  onChange: (values: T[]) => void
  singleSelect?: boolean
  onSearchValueChange: (value: string) => void
  reset: () => void
  error?: string | null
  newLineSupport?: boolean
}

export const InputWithModal = <T extends IData>({
  label,
  modalTitle,
  placeholder,
  data,
  loadMore,
  loading,
  onChange,
  singleSelect = false,
  onSearchValueChange,
  reset,
  error,
  selectedItems = [],
  newLineSupport = false,
}: IProps<T>) => {
  const styles = useStyles()

  const {
    modalVisible,
    closeModal,
    openModal,
    selectedOptions,
    handleConfirm,
    onSelect,
  } = useInputWithModal({
    onChange,
    selectedItems,
    singleSelect,
    reset,
  })

  return (
    <>
      <View>
        <Pressable style={styles.container} onPress={openModal}>
          <Text style={styles.label}>{label}</Text>
          <View
            style={[styles.inputWrapper, !!error && styles.errorInputWrapper]}
          >
            {selectedOptions.length > 0 ? (
              <View style={{ flex: 1 }}>
                <TagsCloud<T>
                  data={selectedOptions}
                  onSelect={onSelect}
                  componentKey={"input"}
                />
              </View>
            ) : (
              <Text style={styles.selectedOption}>{placeholder}</Text>
            )}
            <View>
              <Icon name={"chevronDown"} stroke={colors.common.white} />
            </View>
          </View>
        </Pressable>
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
      <InputModal
        isVisible={modalVisible}
        onClose={closeModal}
        modalTitle={modalTitle}
        data={data}
        loadMore={loadMore}
        loading={loading}
        selectedOptions={selectedOptions}
        handleConfirm={handleConfirm}
        onSelect={onSelect}
        onSearchValueChange={onSearchValueChange}
        newLineSupport={newLineSupport}
      />
    </>
  )
}

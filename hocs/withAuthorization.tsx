import {FC, useState} from "react"
import {StyleSheet} from "react-native"
import {AuthorizedContent} from "@components"
import {LogInToContinueModal} from "@modals"
import {useStore} from "@store"
import {colors} from "@utils/constants"

type EmptyCallback = () => void

declare global {
    interface AuthorizationMixin {
        authorizedCallback: (
            key: string,
            callback?: EmptyCallback
        ) => EmptyCallback
    }
}

interface Modal {
    icon: IconName
    texts: Array<string>
}

export const withSoftAuthorization =
    <T, >(Component: FC<T & AuthorizationMixin>) =>
        (modals: Record<string, Modal>) =>
            (props: T) => {
                const [isModalVisible, setIsModalVisible] = useState(false)
                const [key, setKey] = useState<string | null>(null)

                const {authStore} = useStore()

                const isAuthorized = !!authStore.user

                const authorizedCallback =
                    (key: string, callback?: EmptyCallback) => () => {
                        if (isAuthorized) {
                            callback?.()
                        } else {
                            setKey(key)
                            setIsModalVisible(true)
                        }
                    }

                const modal = key && modals[key]

                return (
                    <>
                        <Component {...props} authorizedCallback={authorizedCallback}/>
                        {modal && (
                            <LogInToContinueModal
                                {...modal}
                                visible={isModalVisible}
                                onClose={() => setIsModalVisible(false)}
                            />
                        )}
                    </>
                )
            }

export const withHardAuthorization =
    <T extends object>(Component: FC<T>) =>
        (icon: IconName, ...texts: Array<string>) =>
            (props: T) => {
                const {authStore} = useStore()

                const isAuthorized = !!authStore.user

                return (
                    <AuthorizedContent
                        icon={icon}
                        texts={texts}
                        isAuthorized={isAuthorized}
                        style={styles.wrapper}
                    >
                        <Component {...props} />
                    </AuthorizedContent>
                )
            }

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: colors.common.background_primary,
    },
})

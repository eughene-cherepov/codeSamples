export interface IConversationUserPhoto {
    conversationId: string
    createdAt: string
    description: string
    fileId: string
    id: string
    link: string
    type: "image"
}

export type TGender = "male" | "female" | null

export interface IConversationUser {
    id: number
    userName: string
    createdAt: string
    updatedAt: string
    photo?: IConversationUserPhoto
    gender: TGender
}

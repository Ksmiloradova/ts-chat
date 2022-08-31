import { Message as MessageModel } from "./models"

export interface ChatState {
    messages: MessageModel[],
    users: string[]
}
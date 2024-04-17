import { Chats } from "./chats";
import { User } from "./user";

export interface Message {
    id?:number,
    chat_id: Chats,
    message:string,
    sender_id:User,
    receiver_id:User,
    created:Date
}

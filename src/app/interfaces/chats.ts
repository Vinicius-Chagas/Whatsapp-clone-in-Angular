import { Message } from "./message";
import { User } from "./user";

export interface Chats {
    created:Date,
    id:number,
    receiver_id: User,
    sender_id:User,
    messages?:  Message[]
}

import { AnyNotification } from "src/modules/notification/notification.model";
import { RoomType } from "src/modules/room/room.model";

export class LocalNotificationQueries {
    async getNotifications(): Promise<AnyNotification[]> {
        return [{
            timestamp: Date.now(),
            subject: "room_created",
            unread: true,
            data: {
                user: {
                    username: "Rimso",
                    id: ""
                },
                room: {
                    id: "",
                    name: "",
                    type: RoomType.Text
                }
            }
        }, {
            timestamp: Date.now(),
            subject: "room_created",
            unread: true,
            data: {
                user: {
                    username: "Toto",
                    id: ""
                },
                room: {
                    id: "",
                    name: "",
                    type: RoomType.Text
                }
            }
        }];
    }
}
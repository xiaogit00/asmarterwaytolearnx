import { NotificationInstance } from "antd/es/notification/interface"

export interface OpenNotification {
    api: NotificationInstance,
    exerciseName: string,
    topicName: string,
    questionNumber: number
}
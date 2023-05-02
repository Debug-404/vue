import { ElNotification } from "element-plus";
export function hint(title, message, type) {
    ElNotification({
        title,
        message,
        type,
    });
}
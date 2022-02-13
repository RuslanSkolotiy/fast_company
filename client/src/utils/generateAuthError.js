export function generateAuthError(message) {
    switch (true) {
        case message === "EMAIL_NOT_FOUND":
        case message === "INVALID_PASSWORD":
            return "Пароль или email неверный"
        case message === "USER_DISABLED":
            return "Учетная запись пользователя отключена администратором"
        case message.startsWith("TOO_MANY_ATTEMPTS_TRY_LATER"):
            return "Доступ к этой учетной записи был временно отключен из-за множества неудачных попыток входа в систему. Вы можете немедленно восстановить его, сбросив пароль, или можете повторить попытку позже."
        case message === "EMAIL_EXISTS":
            return "Пользователь с таким email уже существует"
        default:
            return "Неизвесная ошибка"
    }
}


export const chatid = (state = "ghassen", action) => {
    switch (action.type) {
        case 'CHAT':
            return state = action.payload

        default:
            return state;
    }
}
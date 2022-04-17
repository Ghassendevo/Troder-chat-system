export const newuser = (state = true, action) => {
    switch (action.type) {
        case 'NEW':
            return !state

        default:
            return state;
    }
}

export default newuser;
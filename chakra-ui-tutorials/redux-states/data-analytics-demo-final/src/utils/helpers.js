export const createActions = (type, payload) => {
    const dto = {
        type,
    };

    if (payload) {
        dto.payload = payload;
    }

    return dto;
};
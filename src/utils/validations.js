//validation to ensure correct panel data
export const validatePolicyData = (data) => {
    if (data.title.length > 15) {
        return "Title cannot be longer than 15 characters.";
    } else if (!data.title.length) {
        return "Title can not be empty.";
    } else if (!data.contentUrl.length) {
        return "Content URL cannot be empty";
    } else {
        return false;
    }
};
//validation to test Policy Data
export const validatePolicyData = (data) => {
    if (data.premium > 1000000) {
        return "Premium amount cannot be more than 1 Million";
    } else if (!data.premium || !(/^\d+$/.test(data.premium))) {
        return "Premium amount must be in range of 1 - 1,000,000 $";
    } else {
        return false;
    }
};
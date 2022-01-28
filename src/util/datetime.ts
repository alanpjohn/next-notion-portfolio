const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export const getMonthAndYear = (timestring: string): string => {
    const tempDate = new Date(Date.parse(timestring));
    if (tempDate) {
        return months[tempDate.getMonth()] + " " + tempDate.getFullYear();
    }
    return "";
};

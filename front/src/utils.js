export const formatDate = (date) => {
    const newDate = new Date (date);
    return [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()].join('/') +
    ' ' +
    [[newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()].join(':')];
};


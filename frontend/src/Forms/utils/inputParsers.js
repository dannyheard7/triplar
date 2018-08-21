export let inputParsers = {
    date(input) {
        const [day, month, year] = input.split('/');
        return `${year}-${month}-${day}`;
    },
};
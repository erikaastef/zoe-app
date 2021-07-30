export const currencyFormat = (amount) => {
    const expression = String(amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return `$${expression}`
}

export const sortAgents = ({ agents, type }) => {
    switch (type) {
        case 'name':
            return agents.sort((a, b) => a.name < b.name ? -1 : 1);
        case 'id':
            return agents.sort((a, b) => a.id < b.id ? -1 : 1);
        case 'lowestIncome':
            return agents.sort((a, b) => a.income > b.income ? 1 : -1);
        case 'highestIncome':
            return agents.sort((a, b) => a.income < b.income ? 1 : -1);

        default:
            return agents
    }
}
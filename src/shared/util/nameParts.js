import _ from 'lodash';


const nameParts = (name) => {

    if (!name) return ['invalid', 'invalid', 'invalid', 'invalid']

    const nameArray = name.trim().split(' ');
    switch (nameArray.length) {
        case 0:
        case 1:
            return ['invalid', 'invalid', 'invalid', 'invalid']
        case 2:
            return [nameArray[0].replace(/-/g, ' '), '', '', nameArray[1].replace(/-/g, ' ')]
        case 3:
            return [nameArray[0].replace(/-/g, ' '), nameArray[1].replace(/-/g, ' '), '', nameArray[2].replace(/-/g, ' ')]
        case 4:
            return [nameArray[0].replace(/-/g, ' '), nameArray[1].replace(/-/g, ' '), nameArray[2].replace(/-/g, ' '), nameArray[3].replace(/-/g, ' ')]
        default:
            return [nameArray[0].replace(/-/g, ' '), nameArray[1].replace(/-/g, ' '), nameArray.slice(2, nameArray.length - 1).join(' ').replace(/-/g, ' '), _.last(nameArray).replace(/-/g, ' ')]

    }
}

export { nameParts }
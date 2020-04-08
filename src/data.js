export const filter = (data, callback) => {
    let filteredData = [];
    for(let i = 0; i < data.length; i++) {
        if(callback(data[i])) {
            filteredData.push(data[i]);
        }
    }
    return filteredData;
}

export const map = (data, fieldName, callback) => {
    let mappedData = [];
    for(let i = 0; i < data.length; i++) {
        const obj = {...data[i]};
        obj[fieldName] = callback(obj);
        mappedData.push(obj);
    }
    return mappedData;
}

const generateColumns = (obj) => {
    
}
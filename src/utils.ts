
const queryDatabase = (db: string, query: string): Promise<any> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({});
        }, 2000);
    });
}

const writeToDatabase = (obj: object): Promise<any> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({});
        }, 2000);
    });
}

export { queryDatabase, writeToDatabase }
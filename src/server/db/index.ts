let config = require('../../../config');
let Connection = config.Connection;

import Blogs from './blogs';
import Tags from './tags';
import Authors from './authors';
import AllTags from './allTags';

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, values, (err: any, results: any) => {
            if (err) return reject(err);
            return resolve(results);
    })
})
};

Connection.connect((err: any) => {
    if (err) console.log(err);
})


export default {
    Blogs,
    Tags,
    Authors,
    AllTags
}
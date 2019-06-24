import { Query } from './index';

const getAuthId = async (name: string) => Query('CALL spGetAuthId(?)', [name]);


export default {
    getAuthId
}



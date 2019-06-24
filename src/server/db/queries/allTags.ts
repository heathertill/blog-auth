import { Query } from '../index';

const allOneTag = async (id: number) => Query('SELECT * FROM blogs b JOIN blogTags bt ON b.id = bt.blogid WHERE bt.tagid = ?', [id]);
    
export default {
    allOneTag
 }
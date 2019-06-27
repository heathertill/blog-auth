// import * as mysql from 'mysql';
import config from '../config';
import * as knex from 'knex';

// table query imports
import Blogs from './queries/blogs';
import Tags from './queries/tags';
import Users from './queries/users';
import AllTags from './queries/allTags';
import AccessTokens from './queries/accesstokens'

//node - mysql connection pool
// export const pool = mysql.createPool(config.mysql);

export const connection = knex(config.knex);



// export for use, i.e. DB.Blogs...
export default {
    Blogs,
    Tags,
    Users,
    AllTags,
    AccessTokens
}
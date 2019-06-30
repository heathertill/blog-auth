import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

import config from '../../config';
import queries from '../../db';

export const CreateToken = async (payload: IPayload) => {
    console.log('util/sec/token/ring')
    let tokenid: any = await queries.AccessTokens.insert(payload.userid);
    console.log('util/sec/tok/tokenid', tokenid);
    payload.accesstokenid = tokenid.insertId;
    console.log('util/sec/tok/payload.acctokid', payload.accesstokenid);
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jwt.sign(payload.accesstokenid, config.auth.secret);
    console.log('util/sec/tok/token', token)
    await queries.AccessTokens.update(payload.accesstokenid, token);
    return token;
};

///*** */

export const ValidToken = async (token: string) => {
    // give jwt the IPayload generic so it can decode it into the kind of payload we need
    let payload: any = <IPayload>jwt.decode(token);
    // the [] says i want the property inside the array to be called ...
    // represents [{}] the object inside the array
    // can also access it by payload.accesstokenid[0]
    let [accesstokenid] = await queries.AccessTokens.findOne(payload, token);
    if (!accesstokenid) {
        throw new Error('Invalid Token!');
    } else {
        return accesstokenid;
    }
}

// not currently used -- should be uesed in auth/login
export const GenerateExpireDate = () => {
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 30);
    return expireDate;
}

// not currently used -- should be uesed in auth/login
export const IsExpired = (expireDate: Date) => {
    let now = new Date();
    if (expireDate >= now) {
        return false;
    } else { 
        return true;
    }
}

export interface IPayload {
    [key: string]: any;
    userid: number;
    unique?: string;
}
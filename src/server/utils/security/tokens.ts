import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

import config from '../../config';
import DB from '../../db';

export const CreateToken = async(payload: IPayload) => {
    let tokenid: any = await DB.AccessTokens.insert(payload.userid);
    payload.accesstokenid = tokenid.insertId;
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jwt.sign(payload.accesstokenid, config.auth.secret);
    await DB.AccessTokens.update(payload.accesstokenid, token);
    return token;
};

export const ValidToken = async (token: string) => {
    console.log('utils/sec/tokens', token)
    // give jwt the IPayload generic so it can decode it into the kind of payload we need
    let payload: any = <IPayload>jwt.decode(token);
    console.log('utils/sec/tokens/payload', payload);
    // the [] says i want the property inside the array to be called ...
    // represents [{}] the object inside the array
    // can also access it by payload.accesstokenid[0]
    let [accesstokenid] = await DB.AccessTokens.findOne(payload, token);
    console.log('utils/sec/tokens/acctokid', accesstokenid)
    if (!accesstokenid) {
        throw new Error('Invalid Token!');
    } else {
        console.log('utils/sec/tokens/acctokid2', accesstokenid)
        return accesstokenid;
    }
}

export interface IPayload {
    [key: string]: any;
    userid: number;
    unique?: string;
}
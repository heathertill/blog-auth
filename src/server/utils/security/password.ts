import * as bcrypt from 'bcrypt';

// this generates the hash
export const HashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    console.log('*25 util/sec/pass/salt', salt);
    const hash = bcrypt.hashSync(password, salt);
    console.log('*26 util/sec/pass/hash', hash);
    return hash;
};

export const ComparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}



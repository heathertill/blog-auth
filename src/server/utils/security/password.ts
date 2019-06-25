import * as bcrypt from 'bcrypt';

// this generates the hash
export const HashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log('utils/sed/pass/hashsalt', password, salt)
    return hash;
};

export const ComparePassword = (password: string, hash: string) => {
    console.log('utils/sec/pass/passw', password)
    return bcrypt.compareSync(password, hash);
}
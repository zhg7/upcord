import { SignUpUser } from '../types/user.type';
import { insertUser } from '../services/auth.service';

export async function createUser(newUser: SignUpUser) {
    insertUser(newUser);
}
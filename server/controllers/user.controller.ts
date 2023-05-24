import express, { Request, Response } from 'express';
import crypto from 'crypto';
import { getUserByUsername, getUserStats, emailExists, usernameExists, validateUserAccount, updateProfile, updateUser, getUserBySessionToken, updateUserPassword, getUserBan, addUserBan, removeUserBan } from "../services/user.service";
import { isSessionTokenValid } from '../services/auth.service';
import { uploadImage } from '../utils/image';

export async function checkDuplicateEmail(req: Request, res: Response) {
    const email = req.params.email;
    const isEmailDuplicated = await emailExists(email);
    return res
        .json({ email: email, exists: isEmailDuplicated });
}

export async function checkDuplicateUsername(req: Request, res: Response) {
    const username = req.params.username;
    const isUsernameDuplicate = await usernameExists(username);
    return res
        .json({ username: username, exists: isUsernameDuplicate });
}

export async function activateUserAccount(req: Request, res: Response, userId: number) {
    await validateUserAccount(userId);
    return res
        .status(200)
        .json({ result: "account verified" });
}

export async function getUserDetails(req: Request, res: Response) {
    const user = await getUserByUsername(req.params.username);

    if (user) {
        return res
            .status(200)
            .json(user);
    } else {
        return res
            .status(404)
            .end();
    }
}

export async function editProfileDetails(req: Request, res: Response) {
    const { avatar, biography } = req.body;
    const sessionToken = req.cookies.uc_session;
    if (sessionToken && await isSessionTokenValid(sessionToken)) {
        const user = await getUserBySessionToken(sessionToken);

        const avatarUrl = await uploadImage(avatar);

        await updateProfile(Number(user?.user.id), avatarUrl as string, biography);

        return res
            .status(200)
            .end();
    } else {
        return res
            .status(403)
            .end();
    }

}

export async function editUserDetails(req: Request, res: Response) {
    const { username, email, password } = req.body;
    const sessionToken = req.cookies.uc_session;
    if (sessionToken && await isSessionTokenValid(sessionToken)) {
        const user = await getUserBySessionToken(sessionToken);
        await updateUser(Number(user?.user.id), username, email, password || undefined);
        return res
            .status(200)
            .end();
    } else {
        return res
            .status(403)
            .end();
    }
}

export async function resetUserPassword(req: Request, res: Response, userId: number) {
    const newPassword = crypto.randomBytes(4).toString('hex');

    await updateUserPassword(userId, newPassword);

    return res
        .status(200)
        .json({ "new password": newPassword });

}

export async function retrieveUserBan(req: Request, res: Response) {
    const username = req.params.username;
    const user = await getUserByUsername(username);
    const userId = user?.id;

    const ban = await getUserBan(Number(userId));

    return res
        .status(200)
        .json(ban);
}

export async function createUserBan(req: Request, res: Response) {

    const { targetUserId, authorUserId, reason, expiresAt } = req.body;
    await addUserBan(Number(targetUserId), Number(authorUserId), reason, new Date(expiresAt));
    return res
        .status(200)
        .json({ "result": "banned" });

}


export async function deleteUserBan(req: Request, res: Response) {

    const banId = req.body.banId;
    await removeUserBan(Number(banId));

    return res
        .status(200)
        .json({ "result": "unbanned" });

}

export async function getStats(req: Request, res: Response){
    const username = req.params.username;

    const stats = await getUserStats(username);

    return res
        .status(200)
        .json(stats);
}



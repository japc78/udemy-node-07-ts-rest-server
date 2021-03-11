import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();
    if (!users) return res.status(404).json({msg: `There are not any users in Database`});
    res.json( {users} );
}

export const getUser = async (req: Request, res: Response) => {
    const {id} = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({msg: `The user with id: ${id}, is not exists in Database`});
    res.json({ user });
}


export const postUser = async (req: Request, res: Response) => {
    try {
        const { body } = req;

        const existsEmail = await User.findOne({
            where: {
                email: body.email,
            }
        })

        if (existsEmail) return res.status(404).json({msg: `The user with email: ${body.email}, already exists in Database`});

        const user = await User.create(body);
        res.json( {user} );
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact with administrator'
        })
    }
}

export const putUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({msg: `The user with id: ${id}, is not exists in Database`});
    user.update(body);
    res.json({ user });
}

export const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({msg: `The user with id: ${id}, is not exists in Database`});
    await user.update({state: false});
    res.json({user});
}






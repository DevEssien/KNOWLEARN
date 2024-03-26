import { Schema, Document, model } from "mongoose";

export interface IToken {
	userId: string;
	token: string;
	createdAt: Date;
}

export type ITokenDoc = IToken & Document<IToken>;

const TokenSchema = new Schema<IToken>({
	userId: {
		type: String,
		required: true,
		ref: "User",
	},
	token: { type: String, required: true },
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 3600,
	},
});

export default model<IToken>("Token", TokenSchema);

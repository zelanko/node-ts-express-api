import type { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId;
  name: {
    first: string;
    middle?: string;
    last: string;
  }
  createdAt: Date;
};
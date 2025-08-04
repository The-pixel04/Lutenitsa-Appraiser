import { Appraise } from "./appraise.model";
import { Comment } from "./comment.model";

export interface ExtendedAppraise extends Appraise {
    comments: Comment[];
}
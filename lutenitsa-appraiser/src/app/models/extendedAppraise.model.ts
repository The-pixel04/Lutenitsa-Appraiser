import { Appraise } from "./appraise.model";

export interface ExtendedAppraise extends Appraise {
    comments: Comment[];
}
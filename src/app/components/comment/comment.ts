import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-comment',
    imports: [DatePipe],
    templateUrl: './comment.html',
    styleUrl: './comment.css'
})
export class CommentCard {
    @Input() comment !: Comment;
}


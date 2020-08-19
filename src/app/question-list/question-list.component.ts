import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { QuestionService } from '../question.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit {

  questions: Question[];
  answers = new Map();
  result: string;

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions;
      questions.forEach(quest => {
        this.answers.set(quest.question, 0);
      });
    });
  }

  setAnswer(score: number, question: string): void {
    this.answers.set(question, score);
  }

  getResult(): void {
    this.questionService.getResult(this.answers).subscribe(result => {
      this.result = result;
    });
  }
}

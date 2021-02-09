import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedList } from '../models/PagedList';
import { ITest } from '../models/test';
import { AnswerControllerService } from './api.controller.services/answer.controller.service';
import { QuestionControllerService } from './api.controller.services/question.controller.service';
import { TestControllerService } from './api.controller.services/test.controller.service';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(
    private testControllerService: TestControllerService,
    private answerControllerService: AnswerControllerService,
    private questionControllerService: QuestionControllerService
  ) {}

  getAll(pageNumber: number, pageSize: number): Observable<PagedList<ITest>> {
    return this.testControllerService.get(pageNumber, pageSize).pipe(
      map((data: HttpResponse<ITest[]>) => {
        const paginationHeader = data.headers.get('X-Pagination');
        const tests = data.body;
        tests.forEach((test: ITest) => {
          if (test.questionTimeLimit !== null) {
            test.questionTimeLimit = moment(test.questionTimeLimit, 'HH:mm:ss');
          }
          if (test.testTimeLimit !== null) {
            test.testTimeLimit = moment(test.testTimeLimit, 'HH:mm:ss');
          }
        });
        const pl = new PagedList<ITest>([]);
        return pl.fromString(tests, paginationHeader);
      })
    );
  }

  createTest(test: ITest): Observable<ITest> {
    return this.testControllerService.post(test);
  }

  getTest(id: string): Observable<ITest> {
    return this.testControllerService.getById(id).pipe(
      map((data: ITest) => {
        const test = data;
        if (test.questionTimeLimit !== null) {
          test.questionTimeLimit = moment(test.questionTimeLimit, 'HH:mm:ss');
        }
        if (test.testTimeLimit !== null) {
          test.testTimeLimit = moment(test.testTimeLimit, 'HH:mm:ss');
        }
        return test;
      })
    );
  }

  getQuiz(id: string): Observable<ITest> {
    return this.testControllerService.getQuizById(id).pipe(
      map((data: ITest) => {
        const test = data;
        if (test.questionTimeLimit !== null) {
          test.questionTimeLimit = moment(test.questionTimeLimit, 'HH:mm:ss');
        }
        if (test.testTimeLimit !== null) {
          test.testTimeLimit = moment(test.testTimeLimit, 'HH:mm:ss');
        }
        return test;
      })
    );
  }

  deleteTest(id: string): Observable<any> {
    return this.testControllerService.delete(id);
  }

  editTest(test: ITest): Observable<ITest> {
    return this.testControllerService.put(test);
  }

  deleteAnswer(id: string): Observable<any> {
    return this.answerControllerService.delete(id);
  }

  deleteQuestion(id: string): Observable<any> {
    return this.questionControllerService.delete(id);
  }
}

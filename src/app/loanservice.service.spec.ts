import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { LoanserviceService } from './loanservice.service';

describe('CaseService', () => {
  let service: LoanserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientTestingModule,
    ],});
    
    service = TestBed.inject(LoanserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
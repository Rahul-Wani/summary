import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'src/app/Services/summary.service';
import { ToastrService } from 'ngx-toastr';
import { SummaryModel } from 'src/app/Models/summary.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  public summaryList: SummaryModel[] = [];
  constructor(private summaryService: SummaryService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getSummaryList();
  }

  // Get Summary List
  getSummaryList(): void {
    this.summaryService.getSummary().subscribe({
      next: (summaryListResponse: SummaryModel[]) => {
        this.summaryList = summaryListResponse;
      }, error: error => {
        this.toastr.error(error.error);
      }
    })
  }
}

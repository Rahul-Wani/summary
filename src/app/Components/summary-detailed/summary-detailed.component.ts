import { Component, OnInit } from '@angular/core';
import { SummaryService } from 'src/app/Services/summary.service';
import { ToastrService } from 'ngx-toastr';
import { SummaryModel } from 'src/app/Models/summary.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-summary-detailed',
  templateUrl: './summary-detailed.component.html',
  styleUrls: ['./summary-detailed.component.css'],
})
export class SummaryDetailedComponent implements OnInit {
  public summaryList: SummaryModel[] = [];
  public summaryForm!: FormGroup;
  public selectedSummary!: SummaryModel;

  constructor(
    private summaryService: SummaryService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formInit();
    this.getSummaryList();
  }

  // Form initilization
  formInit(): void {
    this.summaryForm = this.fb.group({
      projectname: [''],
      constructioncount: [''],
      isconstructioncompleted: [''],
      lengthoftheroad: [''],
    });
  }

  // Get Summary List
  getSummaryList(): void {
    this.summaryService.getSummary().subscribe({
      next: (summaryListResponse: SummaryModel[]) => {
        if (summaryListResponse) {
          this.summaryList = summaryListResponse;
          this.showSummary(this.summaryList[0]);
        }
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }

  // Upadate record
  updateSummary() {
    const formData = this.convertPayload();
    this.summaryService.updateSummary(formData, this.selectedSummary.id).subscribe({
      next: (summaryupdate: SummaryModel) => {
        this.toastr.success("Record has been updated successfully!", 'Success');
      },
      error: (error) => {
        this.toastr.error(error.error);
      },
    });
  }

  // Show record on selection
  showSummary(summaryRecord: SummaryModel) {
    this.selectedSummary = summaryRecord;
    summaryRecord.Properties.forEach((property) => {
      const propertyName = property.Label.toLowerCase().replace(/ /g, '');
      const control = this.summaryForm.get(propertyName);
      if (control !== null) {
        control.setValue(property.Value || null);
      }
    });
    console.log(this.summaryForm.value, 'formData')
  }

  // Convert form into payload
  convertPayload() {
    const convertedData = Object.entries(this.summaryForm.value).map(([key, value]) => {
      let label = '';
      switch (key) {
          case 'projectname':
              label = 'Project Name';
              break;
          case 'constructioncount':
              label = 'Construction Count';
              break;
          case 'isconstructioncompleted':
              label = 'Is Construction Completed';
              break;
          case 'lengthoftheroad':
              label = 'Length of the road';
              break;
          default:
              break;
      }
      return { Value: value, Label: label };
  });
  const result = { 
    SamplingTime: this.selectedSummary.SamplingTime,
    Properties: convertedData };
  return result;
  }
}

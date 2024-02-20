// emission-results.component.ts
import { Component, OnInit } from '@angular/core';
import { EmissionService } from '../../../service/emission.service';
import { Observable, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeysPipe } from '../../pipe/KeysPipe';

@Component({
  selector: 'app-emission-results',
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule,KeysPipe],
  templateUrl: './emission-results.component.html',
  styleUrls: ['./emission-results.component.scss']
})
export class EmissionResultsComponent implements OnInit {
  results$!: Observable<any>;

  constructor(private emissionService: EmissionService,private fb: FormBuilder) { }
  flightForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.flightForm = this.fb.group({
      flights: this.fb.array([
       this.createFlightFormGroup()
      ])
    });
  }



  createFlightFormGroup(){
    return      this.fb.group({
      origin: ['', [Validators.required, Validators.maxLength(3)]],
      destination: ['', [Validators.required, Validators.maxLength(3)]],
      operatingCarrierCode: ['', [Validators.required, Validators.maxLength(2)]],
      flightNumber: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      departureDate: this.fb.group({
        year: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
        month: [null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(12)]],
        day: [null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(31)]],
      })
    })
  }


  get flightControls() {
    return (this.flightForm.get('flights') as FormGroup).controls as any;
  }
  
  addFlight(): void {
    (this.flightForm.get('flights') as FormArray)?.push(this.createFlightFormGroup());
  }
  getFlightControls(index: number): FormGroup {
    return (this.flightForm.get('flights') as FormGroup).controls[index] as FormGroup;
  }

  onSubmit(): void {
    debugger
    if (this.flightForm.valid) {
      const formData = this.flightForm.value;
      console.log(formData);
      this.results$ = this.emissionService.computeFlightEmissions(formData).pipe(map(data=>JSON.parse(data) ));

      // Send formData to your API or perform desired actions
    } else {
      // Handle form validation errors
    }
  }
}

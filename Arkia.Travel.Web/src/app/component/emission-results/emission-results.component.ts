// emission-results.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmissionService } from '../../../service/emission.service';
import { Observable, map, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeysPipe } from '../../pipe/KeysPipe';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-emission-results',
  standalone:true,
  imports:[CommonModule, ReactiveFormsModule,KeysPipe,MatCardModule,MatButtonModule],
  templateUrl: './emission-results.component.html',
  styleUrls: ['./emission-results.component.scss'],
  encapsulation:ViewEncapsulation.None,
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(-{{itemWidth}}px)' }), // Initial state off-screen to the left
        animate('500ms ease', style({ transform: 'translateX(-{{itemWidth}}px)' })),
      ]),
    ]),
  ],
})
export class EmissionResultsComponent implements OnInit {
  results$!: Observable<any>;
  currentIndex = 0;
  totalFights=0; 
  itemWidth = 432; // Adjust based on the width of your card including margin
  constructor(private emissionService: EmissionService,private fb: FormBuilder) { }
  flightForm!: FormGroup;

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.flightForm = this.fb.group({
      flights: this.fb.array([
       this.createFlightFormGroup("ZRH","CDG","AF",1115,{"year": 2024, "month": 6, "day": 1})
      ])
    });
  }

  // "origin": "ZRH",
  // "destination": "CDG",
  // "operatingCarrierCode": "AF",
  // "flightNumber": 1115,
  // "departureDate": {"year": 2024, "month": 6, "day": 1}
  // {
  //   "origin": "CDG",
  //   "destination": "BOS",
  //   "operatingCarrierCode": "AF",
  //   "flightNumber": 334,
  //   "departureDate": {"year": 2024, "month": 6, "day": 1}
  // },
  // {
  //   "origin": "ZRH",
  //   "destination": "BOS",
  //   "operatingCarrierCode": "LX",
  //   "flightNumber": 52,
  //   "departureDate": {"year": 2024, "month": 5, "day": 1}
  // }
  createFlightFormGroup(origin:string| null= null,destination:string| null=null,operatingCarrierCode:string| null=null,flightNumber:number|null=null,departureDate?:{year:number,month :number,day:number}){
    return      this.fb.group({
      origin: [origin||'', [Validators.required, Validators.maxLength(3)]],
      destination: [destination||'', [Validators.required, Validators.maxLength(3)]],
      operatingCarrierCode: [operatingCarrierCode||'', [Validators.required, Validators.maxLength(2)]],
      flightNumber: [flightNumber||'', [Validators.required, Validators.pattern('^[0-9]*$')]],
      departureDate: this.fb.group({
        year: [departureDate?.year||'', [Validators.required, Validators.pattern('^[0-9]*$')]],
        month: [departureDate?.month||'', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(12)]],
        day: [ departureDate?.day||'', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1), Validators.max(31)]],
      })
    })
  }


  get flightControls() {
    return (this.flightForm.get('flights') as FormGroup).controls as any;
  }
  removeFlight(): void {
  const controls=  (this.flightForm.get('flights') as FormArray)?.controls;
  if(controls.length>1)
      controls.pop(); // Removes the last control
  }
  addFlight(): void {
    (this.flightForm.get('flights') as FormArray)?.push(this.createFlightFormGroup());
  }
  get getFlightFormArray(): FormArray {
    return this.flightForm.get('flights') as FormArray;
  }

  onSubmit(): void {
    debugger
    if (this.flightForm.valid) {
      const formData = this.flightForm.value;
      console.log(formData);
      this.results$ = this.emissionService.computeFlightEmissions(formData).pipe(map(data=>JSON.parse(data)),tap(data=> this.totalFights=data.flightEmissions.length));

      // Send formData to your API or perform desired actions
    } else {
      // Handle form validation errors
    }
  }

  navigateToIndex(index: number): void {
    debugger
    this.currentIndex = index;
  }
}

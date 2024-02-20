import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionResultsComponent } from './emission-results.component';

describe('EmissionResultsComponent', () => {
  let component: EmissionResultsComponent;
  let fixture: ComponentFixture<EmissionResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmissionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

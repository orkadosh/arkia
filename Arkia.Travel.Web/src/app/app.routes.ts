import { Routes } from '@angular/router';
import { EmissionResultsComponent } from './component/emission-results/emission-results.component';


export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'emission'},
    {path:'emission', component:EmissionResultsComponent},
];


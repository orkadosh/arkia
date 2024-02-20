import { Routes } from '@angular/router';
import { EmissionResultsComponent } from './component/emission-results/emission-results.component';


export const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'emission'},
    {path:'emission', component:EmissionResultsComponent},
    //{path:'addCustomer', component:CustomerAddComponent},
    //{path:'addCustomer',loadComponent:()=> import('./../component/customer-add/customer-add.component').then(m=> m.CustomerAddComponent)},

];


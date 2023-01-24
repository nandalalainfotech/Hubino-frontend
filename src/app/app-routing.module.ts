import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('./public/dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'customers',
        loadChildren: () => import('./public/customers/customers.module').then(m => m.CustomersModule),
    },
    {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

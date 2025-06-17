import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip-components.t';
import { TripListingComponent } from './trip-listing/trip-listing.component';
 

export const routes: Routes = [
    { path: "add-trip", component: AddTripComponent},
    { path: "", component: TripListingComponent, pathMatch: "full" }
];
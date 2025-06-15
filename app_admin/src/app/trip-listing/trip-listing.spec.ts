import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

 export class TripListingComponent implements OnInit {
   trips: Array<any> = []

  constructor() {}

  ngOnInit(): void {
    
    }
  }

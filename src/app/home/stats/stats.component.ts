import { Component, OnInit } from '@angular/core';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CountUpModule],
  templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
  ngOnInit(): void {
    
  }
}

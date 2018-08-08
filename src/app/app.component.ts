import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe';

  onFeatureSelected(value: string) {
    this.loadedFeature = value;
  }

  isFeatureLoaded(value: string): boolean {
    return this.loadedFeature === value;
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {
  
  @Input()
  public imageUrl!: string;

  @Input()
  public imageAlt: string = '';

  public hasLoaded: boolean = false;

  public onLoad(): void {
    this.hasLoaded = true;
  }
  
  ngOnInit(): void {
    if (!this.imageUrl) throw new Error('Image URL is required');
  }
}

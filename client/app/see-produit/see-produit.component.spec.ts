import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProduitComponent } from './see-produit.component';

describe('SeeProduitComponent', () => {
  let component: SeeProduitComponent;
  let fixture: ComponentFixture<SeeProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

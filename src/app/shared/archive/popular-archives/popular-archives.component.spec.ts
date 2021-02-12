import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularArchivesComponent } from './popular-archives.component';

describe('PopularArchivesComponent', () => {
  let component: PopularArchivesComponent;
  let fixture: ComponentFixture<PopularArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

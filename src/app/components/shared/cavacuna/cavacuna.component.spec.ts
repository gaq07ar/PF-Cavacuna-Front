import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CavacunaComponent } from './cavacuna.component';

describe('CavacunaComponent', () => {
  let component: CavacunaComponent;
  let fixture: ComponentFixture<CavacunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CavacunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CavacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

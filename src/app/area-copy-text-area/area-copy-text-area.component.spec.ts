import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCopyTextAreaComponent } from './area-copy-text-area.component';

describe('AreaCopyTextAreaComponent', () => {
  let component: AreaCopyTextAreaComponent;
  let fixture: ComponentFixture<AreaCopyTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreaCopyTextAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaCopyTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

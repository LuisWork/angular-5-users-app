import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAppComponent } from './user-app.component';



describe('UserAppComponent', () => {
  let component: UserAppComponent;
  let fixture: ComponentFixture<UserAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

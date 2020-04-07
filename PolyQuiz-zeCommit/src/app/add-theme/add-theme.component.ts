import { Component, OnInit, Inject } from '@angular/core';
import { Theme } from '../models/theme.models';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../services/theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class AddThemeComponent {

  public themes:Theme[];
  public themeForm: FormGroup;
  public themeCreated:Theme;
  public themeCreated$:Observable<Theme>;

  constructor(private router: Router, private route: ActivatedRoute, public formBuilder:FormBuilder,public themeService:ThemeService,
    public dialogRef: MatDialogRef<AddThemeComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.themes=data.themes;

      this.themeForm = this.formBuilder.group({
        name:['',Validators.required],
      });
    }

  addTheme():void{
    const themeToCreate: Theme = this.themeForm.getRawValue() as Theme;
    this.themeCreated=themeToCreate
    this.themeCreated$ = this.themeService.addTheme(themeToCreate);
    this.themeCreated$.subscribe((result)=>{
      this.themeService.setThemesFromUrl();
      this.close();
    }) 
  }

  onNoClick(): void {
    this.close();
  }
  close():void{
    this.dialogRef.close();

  }

}
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizListService } from 'src/app/services/quizList.service';
import { UploadService } from 'src/app/services/upload.service';
import { Theme } from '../../../models/theme.models';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-add-theme',
  templateUrl: './add-theme.component.html',
  styleUrls: ['./add-theme.component.css']
})
export class AddThemeComponent {
  public themeToChange: Theme;
  public themeForm: FormGroup;
  public themeCreated$: Observable<Theme>;
  private image: string;
  private imageReceived: FormData;

  constructor(private router: Router, private route: ActivatedRoute, public formBuilder: FormBuilder, public themeService: ThemeService,
              public dialogRef: MatDialogRef<AddThemeComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private uploadService: UploadService, private quizService: QuizListService) {
      if (data.theme) {
        this.themeToChange = data.theme;
        this.image = this.themeToChange.image;
        this.themeForm = this.formBuilder.group({
          name: [this.themeToChange.name, Validators.required],
        });
      } else {
        this.themeForm = this.formBuilder.group({
          name: ['', Validators.required],
        });
      }
    }

  addTheme(): void {
    const themeToCreate: Theme = this.themeForm.getRawValue() as Theme;
    if (this.imageReceived != null) {
      this.uploadService.addPicture(this.imageReceived).subscribe((image)=>{
        this.image = image;
        themeToCreate.image = this.image
        this.themeService.addTheme(themeToCreate).subscribe(() => {
          this.themeService.setThemesFromUrl();
          this.close();
        });
      });
    } else {
      themeToCreate.image = ''
      this.themeService.addTheme(themeToCreate).subscribe((result) => {
        this.themeService.setThemesFromUrl();
        this.close();
      });
    }
  }

  editTheme(): void {
    const themeToUpdate = this.themeForm.getRawValue();
    themeToUpdate.id = this.themeToChange.id;
    if(this.imageReceived){
      this.uploadService.addPicture(this.imageReceived).subscribe((image) => {
        this.image = image;
        themeToUpdate.image = this.image;
        this.themeService.editTheme(themeToUpdate).subscribe(()=>{
          this.themeService.setThemesFromUrl();
          this.quizService.setQuizzesFromUrl();
          this.close();
        });
      })
    } else {
      themeToUpdate.image = (this.image) ? this.image : '';
      this.themeService.editTheme(themeToUpdate).subscribe(()=>{
        this.themeService.setThemesFromUrl();
        this.quizService.setQuizzesFromUrl();
        this.close();
      });
    }
  }

  onNoClick(): void {
    this.close();
  }
  close(): void {
    this.dialogRef.close();
  }

  receiveImg(img: FormData) {
    this.imageReceived = img;
  }

}

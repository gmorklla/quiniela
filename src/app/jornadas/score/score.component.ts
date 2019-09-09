import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  scoreForm: FormGroup;
  @Output() pronostico = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.listenForm();
  }

  initForm() {
    this.scoreForm = this.fb.group({
      pronostico: ['', Validators.required]
    });
  }

  listenForm() {
    this.scoreForm.valueChanges.subscribe(val =>
      this.pronostico.emit(this.scoreForm.value.pronostico)
    );
  }
}

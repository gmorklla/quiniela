import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  scoreForm: FormGroup;
  @Input() pronosticoGuardado: { resultado: string };
  @Output() pronostico = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.setForm();
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

  setForm() {
    this.scoreForm.setValue(
      {
        pronostico: this.pronosticoGuardado
          ? this.pronosticoGuardado.resultado
          : ''
      },
      { emitEvent: false }
    );
  }
}

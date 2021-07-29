import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  token:any = {};
  loginButton: any;

  constructor(
    public router : Router,
    public auth: LoginService,
    private formBuilder: FormBuilder,
    public localStorage : LocalStorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.minLength(1)]],
      password: ['',[Validators.required, Validators.minLength(1)]],
    });
  }

  login() {
    const form = this.loginForm.value;
    console.log(this.loginForm.controls);
    if(this.loginForm.valid){
      this.loginButton = 'Enviando';
      this.auth.login( 'login', form.email, form.password).subscribe(
          result => {
            if(result){
            this.token.token = result;
            console.log(this.token.token.token);

            this.localStorage.set('token', this.token.token.token);
            this.router.navigateByUrl('/pokemon');

              // Swal.fire({
              //   title: 'Registro exitoso',
              //   showConfirmButton: true,
              //   confirmButtonText: 'Entendido',
              //   confirmButtonColor: '#008000'
              // });
              
            }
          },
          error => {
            Swal.fire({
              title: 'Error API.'
            });
          });
      this.loginButton = 'Enviar';
    }else if(this.loginForm.invalid){
      console.log(this.loginForm);
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Diligencie todos los campos del formulario',
        cancelButtonText: 'Ok'
      });
    }
  }
}

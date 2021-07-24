import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  myForm = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    country: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
  });

  // token : any;
  token:any = {};

  nameButton: any;
  // user:any = this.auth.currentUserObservable.currentUser;

  constructor(
    public router : Router,
    public auth: RegisterService,
    private formBuilder: FormBuilder,
    public localStorage : LocalStorageService
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      lastname: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(10)]],
      country: ['', [Validators.required, Validators.minLength(1)]],
      email: ['',[Validators.required, Validators.minLength(1)]],
      phone: ['',[Validators.required, Validators.minLength(1)]],
      password: ['',[Validators.required, Validators.minLength(1)]],
      confirm_password: ['',[Validators.required, Validators.minLength(1)]], 
    });
  }

  register() {
    const form = this.myForm.value;
    console.log(this.myForm.controls);
    if(this.myForm.valid){
      this.nameButton = 'Enviando';
      this.auth.register( 'signup', form.name, form.lastname, form.country, form.email, form.phone, form.password).subscribe(
          result => {
            if(result){
            this.token.token = result;
            console.log(this.token.token.token);

            this.localStorage.set('token', this.token.token.token);
            this.router.navigateByUrl('/');

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
      this.nameButton = 'Enviar';
    }else if(this.myForm.invalid){
      console.log(this.myForm);
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Diligencie todos los campos del formulario',
        cancelButtonText: 'Ok'
      });
    }
  }

  }

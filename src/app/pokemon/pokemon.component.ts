import { Component, OnInit,Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { ViewportScroller } from "@angular/common";


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit {

  paginatorForm = new FormGroup({
    limit: new FormControl(''),
    offset: new FormControl(''),
  });

  searchForm = new FormGroup({
    pokemonNameOrId: new FormControl(''),
  });

  public token:any = {};
  public search_button: any;
  public pokemones:any = [];
  public details:any = [];
  public page = 1;
  public count = 0;
  public offset = 0;
  public tableSize:any = 20;
  public tableSizesArr:any = [ 
    {
      number:5,
    },
    {
      number:10,
    },
    {
      number:20,
      isSelected:true
    },
    {
      number:50,
    },
    {
      number:100,
    },
  ];
  public pokemonTypes:any = [];
  public comparison:any = [];
  public comparisonResult:any =[]
  public card = 'not-active';
  public displayModal = false;
  public isButtonVisible = false;

  constructor(
    public router : Router,
    public pokemon: PokemonService,
    private formBuilder: FormBuilder,
    public localStorage : LocalStorageService,
    public readonly swalTargets: SwalPortalTargets,
    public scroll: ViewportScroller,
  ) { }

  ngOnInit(): void {
    this.paginatorForm = this.formBuilder.group({
      limit: ['', [Validators.required, Validators.minLength(1)]],
      offset: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(10)]],
    });

    this.searchForm = this.formBuilder.group({
      pokemonNameOrId: ['', [Validators.minLength(1), Validators.maxLength(50)]],
    });

    this.showData(this.tableSize,this.offset);

  }

  searchPokemon(){
    const form = this.searchForm.value;
    console.log(this.searchForm.controls);
    if(this.searchForm.valid){
      this.pokemon.searchPokemon( 'pokemon', form.pokemonNameOrId).subscribe(
        (result:any) => {
            if(result){
              this.pokemonTypes = [];
              for(let i=0;i<result.types.length;i++){
                this.pokemonTypes.push(result.types[i].type.name);
              }
              Swal.fire({
                title: result.name,
                imageUrl: result.sprites.front_default,
                imageWidth: 200,
                imageHeight: 200,
                html:
                  '<b>Altura:</b> ' +result.height+ '<br>'+
                  '<b>Peso:</b> ' +result.weight+'<br>'+
                  '<b>Tipos:</b> ' + this.pokemonTypes,
                showConfirmButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#008000'
              });
              this.searchForm.reset();  
            }
          },
          error => {
            Swal.fire({
              title: 'No se encontró ningún resultado'
            });
            this.searchForm.reset();

          });
      }else if(this.searchForm.invalid){
        console.log(this.searchForm);
        Swal.fire({
          title: 'Formulario inválido',
          cancelButtonText: 'Ok'
      });
    }
  }

  showData(page:any, offset:any): void {
    this.pokemon.getPokemon( 'pokemon', page, offset).subscribe(
      (result:any) => {
          if(result){
            this.count = result.count;
            this.pokemones = [];
            for(let i=0;i<result.results.length;i++){
              this.pokemon.getDetails(result.results[i].url).subscribe(
                (details:any) => {
                    if(details){
                      this.details = [];
                      let picture = '';
                      picture = details.sprites.front_default;
                      this.details.push(details);
                      result.results[i].picture = picture;
                      result.results[i].isSelected = false;
                    }
                  },
                  error => {
                    Swal.fire({
                      title: 'Error en endpoint de detalles.'
                    });
                  });
              this.pokemones.push(result.results[i]);
            }  
            console.log(this.pokemones); 
          }
        },     
        error => {
          Swal.fire({
            title: 'Error en la respuesta del api.'
          });
        });
    }

  pokemonComparison(url:string){
    const exist = this.comparison.indexOf(url);
    console.log(exist);
   
      if(exist == -1){
        if(this.comparison.length < 3){
          this.selectPokemonCss(url)
          this.comparison.push(url);
          this.card = 'active';
        }else{
          Swal.fire({
            title: 'Puedes comparar un máximo de 3 a la vez.'
          });
        }
      }else{
        this.card = 'not-active';
        this.comparison.forEach((value:any,index:any)=>{
          if(value==url) this.comparison.splice(index,1);
        });
        this.selectPokemonCss(url)
      }
    

    if(this.comparison.length >= 2) {
      this.isButtonVisible = true;
    } else {
      this.isButtonVisible = false;
    }
   
    console.log(this.comparisonResult);

    console.log(this.comparison);
  }

  cleanComparison(){
    this.comparison =[];
    this.comparisonResult = [];
  }

  callComparison(){
    for(let i=0;i<this.comparison.length;i++){
      this.getPokemonByUrl(this.comparison[i]);
    }
  }

  getPokemonByUrl(url:string){
    if(this.comparison.length >= 2 && this.comparison.length <= 3){
      // console.log(this.comparison[0]);
        // console.log(this.getPokemonByUrl(this.comparison[i]));

        this.pokemon.getDetails(url).subscribe(
          (details:any) => {
              if(details){
                // this.comparisonResult = [];
                let picture = '';
                picture = details.sprites.front_default;
                this.comparisonResult.push(details);
              }
            },
            error => {
              Swal.fire({
                title: 'Error en endpoint de detalles.'
              });
            });

        // this.getPokemonByUrl(this.comparison[i]);
      }
    }
  

  

  tabSize(event:any){
      this.page = event;
      this.offset =  this.tableSize*(this.page-1); 
      
      this.tableSize = 20;
      console.log(this.tableSize);
      console.log(this.offset);
      console.log(this.page);
      this.showData(this.tableSize, this.offset);
    }

  tableData(event:any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.offset = 0;
      console.log(this.tableSize);
      console.log(this.offset);
      this.showData(this.tableSize, this.offset);
    }

    close() {
      this.displayModal = false;
      this.comparisonResult = [];
      this.comparison = [];
      this.scroll.scrollToAnchor("target");
      console.log(this.comparisonResult);
      console.log(this.comparisonResult);
    }

    open() {
      if(this.comparison.length >= 2){

        this.callComparison();
        this.displayModal = true;
      }
      else{
        Swal.fire({
          title: 'Selecciona más de uno para comparar'
        });
    
      }
    }

    selectPokemonCss(nombre_pokemon:any){
      console.log(nombre_pokemon)
        this.pokemones.map((pokemon:any)=>{
          if(pokemon.url === nombre_pokemon){
            if(this.comparison.length === 3){
              const foundPokemon:any = this.comparison.find((pokemon:any)=>pokemon.url == nombre_pokemon)
              console.log(foundPokemon)
              if(foundPokemon)
              pokemon.isSelected = !pokemon.isSelected;
            } else {
              pokemon.isSelected = !pokemon.isSelected;
            }
          }
        })
    }
}


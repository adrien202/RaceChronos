import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {newArray} from "@angular/compiler/src/util";
import {Chronos} from "../../interfaces/Chronos";


@Component({
  selector: 'app-championship',
  templateUrl: './championship.component.html',
  styleUrls: ['./championship.component.css']
})
export class ChampionshipComponent implements OnInit {

  @ViewChild('min') minInput!: ElementRef;
  @ViewChild('sec') secInput!: ElementRef;
  @ViewChild('millis') millisInput!: ElementRef;

  pilotes: string[] = []

  showConfirmation = false;


  championshipForm!: FormGroup
  participantAjoute: string = '';
  tempsSpeciales: Chronos[][] = [];

  constructor() { }

  ngOnInit(): void {
  }

  initForm(){

  }

  addParticipant() {
    if (this.participantAjoute != ''){
      this.pilotes.push(this.participantAjoute)
    }
    this.participantAjoute = ''
  }

  addChronos(min: string, sec: string, millis: string, playerIndex: number){
    let newChronos: Chronos = {
      minutes: Number(min),
      secondes: Number(sec),
      millisecondes: Number(millis)
    }
    if (this.tempsSpeciales[playerIndex] == null){
      this.tempsSpeciales[playerIndex] = []
    }
    this.tempsSpeciales[playerIndex].push(newChronos)
  }

  deleteChronos(playerIndex: number, specialIndex: number){
    delete this.tempsSpeciales[playerIndex][specialIndex]
  }




  tempsTotalParticipant(allChronos: Chronos[]){
    let tempsTotalmillisec= 0;

    allChronos.forEach(temps =>{
      tempsTotalmillisec += temps.minutes * 60 * 1000;
      tempsTotalmillisec += temps.secondes * 1000;
      tempsTotalmillisec += temps.millisecondes
    })

    let min = Math.trunc(tempsTotalmillisec / 60000)
    tempsTotalmillisec = tempsTotalmillisec - min*60000
    console.log(min)
    let sec = Math.trunc(tempsTotalmillisec / 1000)
    tempsTotalmillisec = tempsTotalmillisec - sec*1000



    return min + '.' + sec + '.' + tempsTotalmillisec
  }


  @HostListener('window:beforeunload', ['$event'])
  // @ts-ignore
  unloadNotification($event: any) {
    if (this.showConfirmation) {
      $event.returnValue = true; // Required for Chrome and Firefox
      return 'Are you sure you want to leave this page?';
    } else {
      $event.returnValue = false;
    }

  }

  refreshPage() {
    // Perform any necessary actions before refreshing the page
    this.showConfirmation = false;
    window.location.reload();
  }

  resetInputs() {
    this.minInput.nativeElement.value = null;
    this.secInput.nativeElement.value = null;
    this.millisInput.nativeElement.value = null;
  }
}

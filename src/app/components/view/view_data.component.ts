import { IndexService } from './../../pages/services/index.services';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view_data.component.html',
  styleUrls: ['./view_data.component.scss']
})
export class ViewDataComponent implements OnInit {
  public control = new FormControl();
  public countries = [];
  public filteredCountries: Observable<string[]>;
  public view_data: any;

  constructor(private http: HttpClient, private indexService: IndexService) { }

  ngOnInit(): void {
    this.filteredCountries = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.http.get('https://api.covid19api.com/summary').subscribe((response:any) => {
      response.Countries.map((data: any) => {
        this.countries.push(data.Country);
      });
    });
    this.http.get('https://geolocation-db.com/json/').subscribe((response: any) => {
      this.control.setValue(response.country_name);
      this.onGetData(response.country_name);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.countries.filter(country => this._normalizeValue(country).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g,'');
  }

  onGetData(country: string) {
    this.http.get('https://api.covid19api.com/summary').subscribe((response:any) => {
      response.Countries.map((data: any) => {
        if(data.Country === country) {
          this.indexService.mapping.next(data);
          this.view_data = data;
        }
      });   
     });
  }

}

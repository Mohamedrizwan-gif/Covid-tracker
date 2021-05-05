import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';

import { IndexService } from './../../pages/services/index.services';
import { Summary, CountriesSummary } from '../interface/summary.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view_data.component.html',
  styleUrls: ['./view_data.component.scss']
})
export class ViewDataComponent implements OnInit {
  public control = new FormControl();
  public countries = [];
  public filteredCountries: Observable<string[]>;
  public view_data: CountriesSummary;
  public isLoading = false;

  constructor(private http: HttpClient, private indexService: IndexService) { }

  ngOnInit(): void {
    this.filteredCountries = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.http.get('https://api.covid19api.com/summary').subscribe((response: Summary) => {
      response.Countries.map((data: CountriesSummary) => {
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

  onGetData(country: string | undefined): void {
    this.isLoading = true;
    const search = country ? country : this.control.value;
    this.http.get('https://api.covid19api.com/summary').subscribe((response: Summary) => {
      response.Countries.map((data: CountriesSummary) => {
        if(data.Country === search) {
          this.indexService.mapping.next(data);
          this.view_data = data;
        }
      });   
      this.isLoading = false;
     });
  }

}

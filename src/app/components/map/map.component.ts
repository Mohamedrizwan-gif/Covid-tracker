import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';

import { environment } from './../../../environments/environment';
import { IndexService } from './../../pages/services/index.services';
import { csv } from '../data/countries.csv/countries.csv';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  map: mapboxgl.Map;
  global: any;
  mapSubscription: Subscription;

  constructor(private http: HttpClient, private indexService: IndexService) { }

  ngOnInit(): void {
    this.http.get('https://api.covid19api.com/summary').subscribe((response: any) => {
      this.global = response.Global;
    });
    this.mapSubscription = this.indexService.mapping.subscribe(response => {
      if(response) {
        const area = csv.find((cs:any) => cs.name === response.Country);
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 5,
          center: [area.longitude, area.latitude]
        });
        this.map.addControl(new mapboxgl.NavigationControl());
        new mapboxgl.Marker({})
        .setLngLat([area.longitude, area.latitude]).addTo(this.map);
      }
    });
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.buildMap();
  }

  buildMap() {
      navigator.geolocation.getCurrentPosition((position:any) => {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 5,
          center: [position.coords.longitude, position.coords.latitude]
        });
        this.map.addControl(new mapboxgl.NavigationControl());
        new mapboxgl.Marker({})
        .setLngLat([position.coords.longitude, position.coords.latitude]).addTo(this.map);        
      });  
  }

  ngOnDestroy(): void {
    this.mapSubscription.unsubscribe();
  }

}

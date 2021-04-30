import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IndexService {
    public mapping = new BehaviorSubject<any>(null);   
    public initialLoad = true;
}
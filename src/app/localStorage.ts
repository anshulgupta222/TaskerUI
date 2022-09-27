import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })

export class LocalStorageService{

    setItem(key : string, value : any):void{
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key : string) : string | null{
        var item = localStorage.getItem(key);
        if(item != null)
            return JSON.parse(item);
        
        return null;
    }

    removeItem(key : string){
        localStorage.removeItem(key);
    }

}
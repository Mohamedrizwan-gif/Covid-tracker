import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    imports: [
        MatAutocompleteModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule
    ],
    exports: [
        MatAutocompleteModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule
    ]
})
export class MaterialModule {}
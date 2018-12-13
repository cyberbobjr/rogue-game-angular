import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule} from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
            declarations: [],
            imports: [
              CommonModule,
              FormsModule,
              HttpClientModule,
              TranslateModule.forRoot({
                                        loader: {
                                          provide: TranslateLoader,
                                          useFactory: HttpLoaderFactory,
                                          deps: [HttpClient]
                                        }
                                      })
            ],
            exports: [
              CommonModule,
              TranslateModule,
              FormsModule,
              HttpClientModule
            ]
          })
export class SharedModule {
}

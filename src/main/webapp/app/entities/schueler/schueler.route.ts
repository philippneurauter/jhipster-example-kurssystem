import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Schueler } from 'app/shared/model/schueler.model';
import { SchuelerService } from './schueler.service';
import { SchuelerComponent } from './schueler.component';
import { SchuelerDetailComponent } from './schueler-detail.component';
import { SchuelerUpdateComponent } from './schueler-update.component';
import { SchuelerDeletePopupComponent } from './schueler-delete-dialog.component';
import { ISchueler } from 'app/shared/model/schueler.model';

@Injectable({ providedIn: 'root' })
export class SchuelerResolve implements Resolve<ISchueler> {
    constructor(private service: SchuelerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISchueler> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Schueler>) => response.ok),
                map((schueler: HttpResponse<Schueler>) => schueler.body)
            );
        }
        return of(new Schueler());
    }
}

export const schuelerRoute: Routes = [
    {
        path: '',
        component: SchuelerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.schueler.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SchuelerDetailComponent,
        resolve: {
            schueler: SchuelerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.schueler.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SchuelerUpdateComponent,
        resolve: {
            schueler: SchuelerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.schueler.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SchuelerUpdateComponent,
        resolve: {
            schueler: SchuelerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.schueler.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const schuelerPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SchuelerDeletePopupComponent,
        resolve: {
            schueler: SchuelerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.schueler.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

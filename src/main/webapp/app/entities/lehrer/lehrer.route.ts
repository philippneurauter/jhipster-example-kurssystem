import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Lehrer } from 'app/shared/model/lehrer.model';
import { LehrerService } from './lehrer.service';
import { LehrerComponent } from './lehrer.component';
import { LehrerDetailComponent } from './lehrer-detail.component';
import { LehrerUpdateComponent } from './lehrer-update.component';
import { LehrerDeletePopupComponent } from './lehrer-delete-dialog.component';
import { ILehrer } from 'app/shared/model/lehrer.model';

@Injectable({ providedIn: 'root' })
export class LehrerResolve implements Resolve<ILehrer> {
    constructor(private service: LehrerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ILehrer> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Lehrer>) => response.ok),
                map((lehrer: HttpResponse<Lehrer>) => lehrer.body)
            );
        }
        return of(new Lehrer());
    }
}

export const lehrerRoute: Routes = [
    {
        path: '',
        component: LehrerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.lehrer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: LehrerDetailComponent,
        resolve: {
            lehrer: LehrerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.lehrer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: LehrerUpdateComponent,
        resolve: {
            lehrer: LehrerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.lehrer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: LehrerUpdateComponent,
        resolve: {
            lehrer: LehrerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.lehrer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lehrerPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: LehrerDeletePopupComponent,
        resolve: {
            lehrer: LehrerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.lehrer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

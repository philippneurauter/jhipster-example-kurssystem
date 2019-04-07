import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Kurs } from 'app/shared/model/kurs.model';
import { KursService } from './kurs.service';
import { KursComponent } from './kurs.component';
import { KursDetailComponent } from './kurs-detail.component';
import { KursUpdateComponent } from './kurs-update.component';
import { KursDeletePopupComponent } from './kurs-delete-dialog.component';
import { IKurs } from 'app/shared/model/kurs.model';

@Injectable({ providedIn: 'root' })
export class KursResolve implements Resolve<IKurs> {
    constructor(private service: KursService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IKurs> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Kurs>) => response.ok),
                map((kurs: HttpResponse<Kurs>) => kurs.body)
            );
        }
        return of(new Kurs());
    }
}

export const kursRoute: Routes = [
    {
        path: '',
        component: KursComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'kurssystemImstApp.kurs.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: KursDetailComponent,
        resolve: {
            kurs: KursResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.kurs.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: KursUpdateComponent,
        resolve: {
            kurs: KursResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.kurs.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: KursUpdateComponent,
        resolve: {
            kurs: KursResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.kurs.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const kursPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: KursDeletePopupComponent,
        resolve: {
            kurs: KursResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'kurssystemImstApp.kurs.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

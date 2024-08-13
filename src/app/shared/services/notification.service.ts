import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { Notification, NotificationModel } from '../interface/notification.interface';
import { RestResponse } from '../types/common.types';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    public alertSubject = new Subject();

    public notification: boolean = true;

    constructor(private zone: NgZone,
        private http: HttpClient,
        private modalService: NgbModal,
        private toastr: ToastrService) { }

    showSuccess(message: string): void {
        this.alertSubject.next({ type: 'success', message: message });
        this.zone.run(() => {
            this.modalService.dismissAll();
            if (this.notification) {
                this.toastr.success(message);
            }
        });
    }

    showError(message: string): void {
        this.alertSubject.next({ type: 'error', message: message });
        this.zone.run(() => {
            if (this.notification) {
                this.toastr.error(message);
            }
        });
    }

    showInfo(message: string): void {
        this.alertSubject.next({ type: 'info', message: message });
        this.zone.run(() => {
            if (this.notification) {
                this.toastr.info(message);
            }
        });
    }

    getNotifications(payload?: Params): Observable<NotificationModel> {
        return this.http.get<RestResponse<Notification[]>>(`${environment.API_URL}/notifications`, { params: payload }).pipe(
            map(response => {
                return {
                    data: response.data!,
                    total: response.data!.length!
                }
            })
        );
    }

    markAsRead(): Observable<RestResponse<Notification>> {
        return this.http.patch<RestResponse<Notification>>(`${environment.API_URL}/notifications/mark-as-read`, {});
    }

}
